

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authroutes = require('./routes/authroute')
const commentsroutes = require('./routes/CommentsRoutes')
const productsroutes = require('./routes/ProductsRoutes')
const userRoute = require('./routes/UserRoutes')
const cors = require("cors")



const app = express()

app.use(cors({
    origin: "http://localhost:5173"
    
}))

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/ecommerce-trop-bien', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.use('/auth', authroutes);
app.use('/comments', commentsroutes);
app.use('/products', productsroutes);
app.use('/users', userRoute);

const PORT = 5000
app.listen(PORT, ()=> console.log('cest bon'))
  