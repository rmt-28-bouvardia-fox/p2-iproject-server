const OrderController = require('../Controllers/orderController')

const router = require('express').Router()

router.patch('/', OrderController.updateStatus)
router.get('/profile', OrderController.getOrders)
router.get('/cart', OrderController.getCart)
router.post('/add-to-cart', OrderController.addToCart)
router.get('/payment', OrderController.order)



module.exports = router