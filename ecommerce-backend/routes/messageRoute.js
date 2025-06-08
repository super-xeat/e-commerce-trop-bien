
const express = require('express')
const route = express.Router()
const Message = require('../models/message')


route.post('/', async(req, res)=> {
    console.log('Corps reçu :', req.body);
    const {user1, user2, text} = req.body

    if (!user1 || !user2 || !text) {
        return res.status(400).json({ message: 'Champs manquants' });
    }
    
    try {
        const newmsg = new Message({user1, user2, text})
        await newmsg.save()
        res.json(newmsg)
    } catch (error) {
        res.status(400).json({message: 'erreur envoi message'})
    }
})

route.get('/liste/:user1id/:user2id', async (req, res)=> {
    const {user1id, user2id} = req.params
    try {

        const envoi = await Message.find( 
            {$or: [
                { user1: user1id, user2: user2id },
                { user1: user2id, user2: user1id }
            ]}
        ).sort({createdAt: 1})
        res.json(envoi)

    } catch (error) {
        res.status(400).json({message: 'erreur envoi message'})
    }
})
 

route.get('/:userid', async(req, res)=> {
    const {userid} = req.params

    try {
        const conversation = await Message.find({
            $or : [{user1: userid, user2: userid}]
        }).populate('user1 user2', 'name')

        const users = new Set()

        conversation.forEach(msg => {
            const otherUser =
                msg.user1._id.toString() === userid ? msg.user2 : msg.user1;
            users.add(JSON.stringify(otherUser));
        });

        const liste = Array.from(users).map(msg => JSON.parse(msg))
        res.json(liste)
    } catch (error) {
        res.status(400).json({message: "erreur"})
    }
})



module.exports = route