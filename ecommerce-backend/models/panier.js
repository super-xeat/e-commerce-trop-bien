

const mongoose = require('mongoose')


const paniershema = new mongoose.Schema({
    panier: {type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true},
    produits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
},{timestamps: true})


module.exports = mongoose.model('Panier', paniershema)