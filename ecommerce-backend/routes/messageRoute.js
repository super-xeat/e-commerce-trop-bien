
const express = require('express')
const route = express.Router()
const Message = require('../models/message')


route.post('/', async(req, res)=> {
    const {user1id, user2id, text} = req.body
    try {
        const newmsg = new Message({user1id, user2id, text})
        await newmsg.save()
        res.json(newmsg)
    } catch (error) {
        res.status(400).json({message: 'erreur envoi message'})
    }
})

route.get(':user1id/:user2id', async (req, res)=> {
    const {user1id, user2id} = req.params
    try {

        const envoi = await Message.find( {$or: [{user2id : user1id}, {user1id : user2id}]}).sort({createdAt: 1})
        res.json(envoi)

    } catch (error) {
        res.status(400).json({message: 'erreur envoi message'})
    }
})

module.exports = route