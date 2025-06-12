
const mongoose = require('mongoose')


const usershema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, role : ['admin', 'user'], default: 'user'},
}, {timestamps: true})

module.exports = mongoose.model('User', usershema)