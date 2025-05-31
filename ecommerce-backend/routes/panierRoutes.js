

const express = require('express')
const route = express.Router()
const Panier = require('./models/panier')



route.get('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const panier = await Panier.findOne({user: id}).populate('produits')
        res.json(panier)
    } catch (error) {
        res.status(400).json({message: 'erreur de panier'})
    }
})


route.post('/:id', async (req, res) => {
    const {id} = req.params
    const {produits} = req.body   
    try {
        const newpanier = new Panier({user: id, produits})
        const saved = await newpanier.save()
        res.json(saved)
    } catch (error) {
        res.status(400).json({message: 'erreur'})
    }
}) 

route.put('/:id', async(req, res)=> {
    const {id} = req.body
    const {produits} = req.body
    try {
        const modify = await Panier.findByIdandPut({user: id}, {produits}, {new: true})
        res.json(modify)
    } catch (error) {
        res.status(400).json({message: 'erreur'})
    }
})