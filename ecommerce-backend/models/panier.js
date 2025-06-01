

const mongoose = require('mongoose')


const paniershema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    produits: [{
      produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantite: { type: Number, default: 1 }
    }]
  }, { timestamps: true })
  


module.exports = mongoose.model('Panier', paniershema)