import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'pusher';

// app config 
const app = express()
const port = process.env.POTRT || 9000

// middlewares
app.use(cors())
app.use(express.json())

// db config
const mongoURI = 'mongodb+srv://admin:Vbti2zaP5b4hu3gx@cluster0.wvs32.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongooseURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// api routes
app.get('/', (req, res) => res.status(200).send('Lets build mern stack🚀🚀'))

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))

//test