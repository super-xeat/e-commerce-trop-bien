



const express = require('express')
const route = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../services/email');



function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}



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
            { userId: existuser._id, 
            role: existuser.role,  },
            'cle_secrete',
            {expiresIn: '2h'})


        res.status(200).json({message:'cest bon', token, 
            user: {_id: existuser._id, 
            name: existuser.name, 
            email: existuser.email, 
            role: existuser.role}}
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
        console.log("Données reçues pour register:", req.body);

        const hashing = await bcrypt.hash(password, 8)

        const code = generateCode()

        const newuser = new User({
            name, 
            email, 
            password: hashing, 
            verifycode: code, 
            verified: false,
        })

        const saved = await newuser.save()

        await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Votre code de vérification',
        text: `hey ca marche, dis moi le code : ${code}`,
        });

        res.status(201).json({message: 'utilisateur créé', user:saved})
    } catch (error) {
        console.error("Erreur dans /register :", error); // 🔥 AJOUTE ÇA
        res.status(500).json({message: "erreur serveur"})
    }
})


route.post('/verify-code', async (req, res)=> {
    const {email, code} = req.body

    try  {
    const userexist = await User.findOne({email}) 
    if (!userexist) {
        return res.status(200).json({message: 'erreur'})
    }

    if (code === userexist.verifycode) {
        userexist.verified = true
        userexist.verificationCode = ''
        await userexist.save()
        return res.status(200).json({message:'compte verifié'})
    }
    return res.status(400).json({ message: 'Code incorrect' })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erreur serveur' })
    }})


module.exports = route