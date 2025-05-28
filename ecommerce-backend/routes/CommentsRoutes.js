

const express = require('express')
const route = express.Router()
const Comments = require('./models/Comment')


route.get('/comments/:id', async (req, res)=> {
    const {id} = req.params
    try {
        const comments = await Comments.find({product : id})
        res.json(comments)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})


route.post('/comments/:id', async(req, res)=> {
    const {name, text } = req.body
    const {id} = req.params
    try {
        const newcomment = new Comments({name, text, product: id})
        const saved = await newcomment.save()
        res.json(saved)
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})