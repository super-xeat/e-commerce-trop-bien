
const mongoose = require('mongoose')


const usershema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isadmin: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now()}
}, {timestamps: true})

module.exports = mongoose.model('User', usershema)