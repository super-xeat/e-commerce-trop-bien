

const mongoose = require('mongoose')


const msgshema = new mongoose.Schema({
    user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text : {type: String, require: true},
    date : {type: Date, default: Date.now() }
}, {timestamps: true})

module.exports = mongoose.model('Message', msgshema)