

const express = require('express')
const route = express.Router()
const Products = require('../models/produit')
const { default: mongoose } = require('mongoose')
const user = require('../models/user')
const {verifytoken, isadmin} = require('../middleware/verifytoken')


route.get('/', async (req, res)=> {
    try {
    const products = await Products.find().populate('user', 'name')
    res.json(products)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})



route.get('/:id', async (req, res)=> {
    const {id} = req.params
    try {
        const produit = await Products.findById(id).populate('user', 'name')
        if (!produit) return res.status(404).json({message: 'pas de produit'})
        res.json(produit)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})


route.post('/', async(req, res)=> {
    console.log("Body reçu :", req.body);
    const {user, titre, description, price, categorie} = req.body
    console.log("ID utilisateur reçu :", user)
    try {
        const newproduct = new Products({user, titre, description, price, categorie})
        const saved = await newproduct.save()
        const populated = await Products.findById(saved._id).populate('user', 'name');

        console.log("Produit enregistré et peuplé :", populated.user)        

        res.json(populated)
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error)
        return res.status(400).json({message: 'erreur'})
    }
})


route.delete('/:id', verifytoken, isadmin, async (req, res)=> {
    const {id} = req.params
    
    try {
        const produit = await Products.findByIdAndDelete(id)
        if (!produit) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json({message: 'element supprimé', produit})       
    } catch (error) {
        res.status(400).json({messsage: 'erreur'})
    }
})


module.exports = route