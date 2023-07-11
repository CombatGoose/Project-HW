const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')

const productRouter = require('./routes/products')

const mongoose = require('mongoose')
mongoose.connect(config.mongoKey)
    .then(()=>{console.log('Connect to MongoDB has been successful')})
    .catch(err => {console.log(err)})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.use(cors(config.corsOptions))

app.use('/products', productRouter)
app.get('/', (req,res) => { 
    res.send("Server started")
})


server.listen(config.port, () => {
    console.log('Server listening on port', config.port)
})