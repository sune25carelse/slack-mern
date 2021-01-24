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
})

// api routes
app.get('/', (req, res) => res.status(200).send('Lets build mern stack🚀🚀'))

app.post('/new/channel',(req,res)=>{
    const dbData = req.body

    mongoData.create(dbData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.statsu(201).send(data)
        }
    })
})

.app.post('/new/message', (req, res) => {
    const id = req.query.id 
    const newMessage = req.body

    mongoData.update(
        { _id: id},
        { $push: { conversation: newMessage }},
        (err, data) => {
         if (err) {
            res.status(500).send(err)
         } else {
            res.status(201).send(data)
         }
        }
    )
})

app.get('/get/channelList', (req, res) => {
    mongoData.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let channel = []
            
            data.map((channelData) => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }
                channels.push(channelsInfo)      
            })
            res.status(200).send(channels)
        }
    })
})

app.get('/get/conversation', (req, res) => {
    const id = req.query.id

    mongoData.find ({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))

