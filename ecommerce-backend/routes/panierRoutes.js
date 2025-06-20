

const express = require('express')
const route = express.Router()
const Panier = require('../models/panier')




route.get('/:id', async(req, res)=> {
    const {id} = req.params
    console.log("ID reçu pour le panier :", id);

    try {
        const panier = await Panier.findOne({user: id}).populate({path: 'produits.produit', populate: {path: 'user', select: 'name'}})
        if (!panier) {
            return res.status(404).json({ message: 'Panier introuvable' });
        }

        console.log("✅ Panier trouvé :", panier);
        res.json(panier)
    } catch (error) {
        console.error("💥 ERREUR DANS LA ROUTE GET PANIER :", error);
        res.status(400).json({message: 'erreur de panier'})
    }
})


route.post('/:id', async (req, res) => {
    const {id} = req.params
    const {produits} = req.body   
    try {
        const newpanier = await Panier.findOneAndUpdate({user: id},{ produits}, { new: true, upsert: true })
        res.json(newpanier)
    } catch (error) {
        res.status(400).json({message: 'erreur'})
    }
}) 

route.put('/update', async(req, res)=> {
    const {id} = req.body
    const {produits} = req.body
    try {
        const modify = await Panier.findOneAndUpdate({user: id}, {produits}, {new: true})
        res.json(modify)
    } catch (error) {
        res.status(400).json({message: 'erreur'})
    }
})


route.delete('/:id/:productid', async (req, res)=> {
    const {id, productid} = req.params
    
    try {
        const supp = await Panier.findOneAndUpdate({user: id}, { $pull: {produits: {produit: productid}}})
        .populate('produits.produit')
        res.json(supp)
    } catch (error) {
        res.status(400).json({message: 'erreur'})
    }
})


module.exports = route