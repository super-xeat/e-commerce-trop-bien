


const express = require('express')
const route = express.Router()
const User = require('../models/user')
const upload = require('../middleware/upload')


route.get('/', async(req, res)=> {
    try {
        const users = User.find()
        res.json(users)
    } catch (error) {
        res.status(400).json({message: 'erreur'})
    }
})


route.delete('/:id', async(req, res)=> {
    const {id} = req.params
    try {
        const supp = await User.findByIdAndDelete(id)
        if (!supp) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json({ message: 'Profil supprimé' })
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})


route.get('/:id', async (req, res)=> {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({message:'erreur'})
        res.json(user)
    } catch (error) {
        res.status(500).json({message: 'pas bon'})
    }
})


route.put('/:id', async(req, res)=> {
    const {id} = req.params
    const {email, name} = req.body
    try {
        const user = await User.findByIdAndUpdate(id,
            {name, email},
            {new: true}
        )
        res.json({message: 'profil mis a jour', user:user})
    } catch (error) {
        res.status(500).json({message: 'erreur de mise a jour'})
    }
})


route.put('/image/:id', upload.single('image'), async(req, res)=> {
    const {id} = req.params
    
    try {
        const user = await User.findByIdAndUpdate(id, 
            {image: req.file.path},
            {new: true}
        )
        const saved = await user.save()
        res.status(200).json({message: 'cest bon', saved})
    } catch (error) {
        return res.status(400).json({message: 'erreur'})
    }
})


module.exports = route


