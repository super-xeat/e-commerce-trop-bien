

const mongoose = require('mongoose')


const commentshema = new mongoose.Schema({
    name: {type: String, required:true},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now}
}, {timestamps: true})


module.exports = mongoose.model('Comment', commentshema)