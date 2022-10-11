const ProductController = require('../controller/productController')
const UserController = require('../controller/userController')
const authentication = require('../middleware/authentication')
const authorization = require("../middleware/authorization");

const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/products', ProductController.getAll)
router.get('/products/:id', ProductController.findOne)
router.patch('/startBid/:id', ProductController.startBid)

router.post('/myBidList/:productId', ProductController.newList)
router.get('/myBidList', ProductController.getAllList)

router.delete('/deleteList/:listId', authorization, ProductController.deleteList)
module.exports = router