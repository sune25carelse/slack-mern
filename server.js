import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'pusher';
import mongoData from './mongoData';

// app config 
const app = express()
const port = process.env.POTRT || 9000

// middlewares
app.use(cors())
app.use(express.json())

// db config
const mongoURI = 'mongodb+srv://admin:Vbti2zaP5b4hu3gx@cluster0.wvs32.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.mongoose.connection('open', () => {
    console.log('DB CONNECTED')

    mongoData.create(dbData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.statsu(201).send(data)
        }
    })
})

// api routes
app.get('/', (req, res) => res.status(200).send('Lets build mern stack🚀🚀'))

app.post('/new/channel',(req,res)=>{
    const dbData = req.body
})

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))

