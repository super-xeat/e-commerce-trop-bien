
const mongoose = require('mongoose')


const usershema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifycode: {type: String},
    verified: {type: Boolean, default: false},
    image:{type:String, required:false},
    role: {type: String, role : ['admin', 'user'], default: 'user'},
}, {timestamps: true})

module.exports = mongoose.model('User', usershema)