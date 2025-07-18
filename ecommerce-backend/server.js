

const express = require('express')
const mongoose = require('mongoose')
const authroutes = require('./routes/authroute')
const commentsroutes = require('./routes/CommentsRoutes')
const productsroutes = require('./routes/ProductsRoutes')
const userRoute = require('./routes/UserRoutes')
const panier = require('./routes/panierRoutes')
const cors = require("cors")
const message = require('./routes/messageRoute')
const http = require('http')
const {Server} = require('socket.io')
const { Socket } = require('dgram')
const Message = require('./models/message');


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET','POST']
    }
})

io.on('connection', (socket)=> {
    console.log('client connected')

    socket.on('envoi message', async (data)=> {
        console.log('message recu', data)

        const newMsg = new Message({
        user1: data.user1,
        user2: data.user2,
        text: data.text
        });

        await newMsg.save()
        io.emit('message recu', data)
    })

    socket.on('disconnect', ()=> {
        console.log('client deconnecté')
    })
})



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



server.listen(5000, ()=> {
    console.log('serveur lancé')
})

  