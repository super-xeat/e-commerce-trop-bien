

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user')


mongoose.connect('mongodb://localhost:27017/ecommerce-trop-bien')
.then(async ()=> {
    const userexist = await User.findOne({email: 'elfondator@gmail.com'})
    if (userexist) {
        return mongoose.disconnect()       
    }

    const code = await bcrypt.hash('elfondator', 10)

    const newuser = new User({
        name: 'elfondator',
        email: 'elfondator@gmail.com',
        password: code,
        role: 'admin'
    })

    await newuser.save()
    console.log('administrateur créé avec succés')
    mongoose.disconnect()
})