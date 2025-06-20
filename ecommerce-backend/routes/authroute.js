



const express = require('express')
const route = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




route.post('/login', async (req, res)=> {
    const {email, password} = req.body
    try {
        const existuser = await User.findOne({email})
        if (!existuser) {
            return res.status(400).json({message: 'cest pas bon'})
        }

        const verify = await bcrypt.compare(password, existuser.password)
        if (!verify) {
            return res.status(400).json({message: "pas bon"})
        }

        const token = jwt.sign(
            { userId: existuser._id, role: existuser.role,  },
            'cle_secrete',
            {expiresIn: '2h'})

        res.status(200).json({message:'cest bon', token, 
            user: {_id: existuser._id, name: existuser.name, email: existuser.email, role: existuser.role}}
        )
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})


route.post('/register', async (req, res)=> {
    console.log('Données reçues :', req.body)
    const {name, email, password} = req.body
    try {
        const emailexist = await User.findOne({email})
        if (emailexist) {
            return res.status(400).json({message: 'email deja existant'})
        }

        const hashing = await bcrypt.hash(password, 10)
        const newuser = new User({name, email, password: hashing})
        const saved = await newuser.save()

        res.status(201).json({message: 'utilisateur créé', user:saved})
    } catch (error) {
        res.status(500).json({message: "erreur serveur"})
    }
})


module.exports = route