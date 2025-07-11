

const express = require('express')
const mongoose = require('mongoose')
const authroutes = require('./routes/authroute')
const commentsroutes = require('./routes/CommentsRoutes')
const productsroutes = require('./routes/ProductsRoutes')
const userRoute = require('./routes/UserRoutes')
const panier = require('./routes/panierRoutes')
const cors = require("cors")
const message = require('./routes/messageRoute')




const app = express()

app.use(express.json())


app.use(cors())


mongoose.connect('mongodb://localhost:27017/ecommerce-trop-bien');


app.use('/auth', authroutes);
app.use('/comments', commentsroutes);
app.use('/products', productsroutes);
app.use('/users', userRoute);
app.use('/panier', panier);
app.use('/message', message)
app.use('/uploads', express.static('uploads'))


const PORT = 5000
app.listen(PORT, ()=> console.log('cest bon'))
  