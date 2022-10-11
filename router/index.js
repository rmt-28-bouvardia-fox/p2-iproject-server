const ProductController = require('../controller/productController')
const UserController = require('../controller/userController')
const authentication = require('../middleware/authentication')

const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/products', ProductController.getAll)
module.exports = router