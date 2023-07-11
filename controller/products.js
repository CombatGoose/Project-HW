const productsModel = require('../models/ProductsModel')
const randomstring = require('randomstring')
module.exports.create = async (req,res) => { 
    const newProduct = new productsModel({ 
        id: randomstring.generate(), 
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    })
    await newProduct.save()
        .then(() => { 
            res.status(201).json("New product created")
        })
        .catch((err) => { 
            res.status(500).json(err)
        })
}

module.exports.delete = async (req,res) => {
    await productsModel.findOneAndDelete({id:req.body.id})
        .then(()=> res.status(200).json("Product deleted"))
        .catch((err) => res.status(500).json(err))
}

module.exports.getList = async (req,res) => { 
    const listProducts = await productsModel.find()
    if (listProducts) { 
        res.status(200).json(listProducts)
    } else { 
        res.status(404).json("Not found")
    }
}

module.exports.getPage = async (req,res) => {
    let firstItem = (req.query.page * req.query.limit) - req.query.limit - 1
    firstItem = (firstItem < 0)? 0 : firstItem
    let products = await productsModel.fing()
        .skip(firstItem)
        .limit(req.query.limit)
    if (products) {
        res.status(200).json(products)
    } else { 
        res.status(500).json("Not found")
    }
}

module.exports.getItem = async (req,res) => {
    let productItem = await productsModel.findOne({id: req.params.id})
    if (productItem) {
        res.status(200).json(productItem)
    } else { 
        res.status(404).json("Not found")
    }
}

module.exports.changePrice = async (req,res) => { 
    await productsModel.findByIdAndUpdate({id:req.params.id}, {price: req.body.id})
        .then(() => res.status(200).json("Success updated"))
        .catch(err => res.status(500).json(err))
}