

const express = require('express')
const route = express.Router()
const Products = require('./models/Product')




route.get('/products', async (req, res)=> {
    try {
    const products = await Products.find()
    res.json(products)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})


route.get('/products/:id', async (req, res)=> {
    const {id} = req.params
    try {
        const produit = await Products.findById(id)
        if (!produit) return res.status(404).json({message: 'pas de produit'})
        res.json(produit)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})

module.exports = route