
const express = require('express')
const route = express.Router()
const Message = require('../models/message')
const mongoose = require('mongoose')



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
        .populate('user1 user2', 'name')
        res.json(envoi)

    } catch (error) {
        res.status(400).json({message: 'erreur envoi message'})
    }
})
 

route.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  console.log("Requête GET /message/:userid avec :", userid);

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).json({ message: 'ID utilisateur invalide' });
  }

  const objectId = new mongoose.Types.ObjectId(userid);

  try {
    const conversation = await Message.find({
      $or: [{ user1: objectId }, { user2: objectId }]
    }).populate('user1 user2', 'name _id');

    console.log("Messages trouvés :", conversation); 

    const users = new Set();

    conversation.forEach(msg => {
      const otherUser =
        msg.user1._id.toString() === userid ? msg.user2 : msg.user1;
      users.add(JSON.stringify(otherUser));
    });

    const liste = Array.from(users).map(userStr => JSON.parse(userStr));
    res.json(liste);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(400).json({ message: "erreur", error: error.message });
  }
});




module.exports = route