

const mongoose = require('mongoose')


const produitshema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true},
    titre: {type: String, required:true},
    description: {type: String, required: true},
    categorie: {type: String, required: true},
    price: {type: Number, required:true},
    image: {type: String, required: false},
    date: {type: Date, required: false}
}, {timestamps: true})

module.exports = mongoose.model('Products', produitshema)