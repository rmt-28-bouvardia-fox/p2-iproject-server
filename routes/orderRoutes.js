const OrderController = require('../Controllers/orderController')

const router = require('express').Router()

router.get('/profile', OrderController.getOrders)
router.get('/cart', OrderController.getCart)
router.post('/add-to-cart', OrderController.addToCart)


module.exports = router