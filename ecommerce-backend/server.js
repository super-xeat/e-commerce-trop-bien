

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authroutes = require('./routes/authroute')
const commentsroutes = require('./routes/CommentsRoutes')
const productsroutes = require('./routes/ProductsRoutes')
const userRoute = require('./routes/UserRoutes')


const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/ecommerce-trop-bien', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

console.log('authroutes:', authroutes);
console.log('commentsroutes:', commentsroutes);
console.log('productsroutes:', productsroutes);
console.log('userRoute:', userRoute);
  
app.use('/auth', authroutes);
app.use('/comments', commentsroutes);
app.use('/products', productsroutes);
app.use('/users', userRoute);

const PORT = 3000
app.listen(PORT, ()=> console.log('cest bon'))
  