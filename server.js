import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Pusher from 'pusher'
import mongoData from './mongoData.js'

// app config 
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1144509",
    key: "ebbf063369b5064a7f31",
    secret: "3eaf0a549b8bc74e2e11",
    cluster: "us3",
    useTLS: true
  });
  

// middlewares
app.use(cors())
app.use(express.json())

// db config
const mongoURI = 'mongodb+srv://admin:Vbti2zaP5b4hu3gx@cluster0.wvs32.mongodb.net/slackDB>?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB CONNECTED')

    const changeStream = mongoose.connection.collection('conversations').watch()

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            });
        } else if (change.operationType === 'update') {
             pusher.trigger('conversation', 'newMessage', {
                 'change': change
             });   
        } else {
            console.log('Error triggeringPusher')
        }
        
    })
})

// api routes
app.get('/', (req, res) => res.status(200).send('Lets build mern stack🚀🚀'))

app.post('/new/channel', (req,res) => {
    const dbData = req.body

    mongoData.create(dbData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

app.post('/new/message', (req, res) => {
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
            let channels = []
            
            data.map((channelData) => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }
                channels.push(channelInfo)      
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

