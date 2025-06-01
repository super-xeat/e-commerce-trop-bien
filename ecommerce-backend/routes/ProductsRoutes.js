

const express = require('express')
const route = express.Router()
const Products = require('../models/produit')



route.get('/', async (req, res)=> {
    try {
    const products = await Products.find()
    res.json(products)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})



route.get('/:id', async (req, res)=> {
    const {id} = req.params
    try {
        const produit = await Products.findById(id)
        if (!produit) return res.status(404).json({message: 'pas de produit'})
        res.json(produit)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})

route.post('/', async(req, res)=> {
    console.log("Body reçu :", req.body);
    const {titre, description, price, categorie} = req.body
    try {
        const newproduct = new Products({titre, description, price, categorie})
        const saved = await newproduct.save()
        res.json(saved)
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error)
        return res.status(400).json({message: 'erreur'})
    }
})


route.delete('/:id', async (req, res)=> {
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