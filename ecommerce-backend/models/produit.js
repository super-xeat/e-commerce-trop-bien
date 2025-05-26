

const mongoose = require('mongoose')


const produitshema = new mongoose.Schema({
    titre: {type: String, required:true},
    description: {type: String, required: true},
    price: {type: Number, required:true},
    image: {type: String, required: false},
    date: {type: Date, required: false}
}, {timestamps: true})

module.exports = mongoose.model('Product', produitshema)