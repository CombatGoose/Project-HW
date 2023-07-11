const express = require('express')
const router = express.Router()
const controller = require('../controller/products')

router.post('/create', controller.create)

router.delete('/delete', controller.delete)

router.get('/get-all', controller.getList)
router.get('/get', controller.getPage)
router.get('/get-item', controller.getItem)
 
router.put('/change-price', controller.changePrice)

module.exports = router