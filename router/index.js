const UserController = require('../controller/userController')
const authentication = require('../middleware/authentication')

const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)


module.exports = router