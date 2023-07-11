const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    quantity: { 
        type: Number
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Product', productSchema)