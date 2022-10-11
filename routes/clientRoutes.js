const ClientController = require('../Controllers/clientController')
const router = require('express').Router()

router.post('/register', ClientController.register)
router.post('/login', ClientController.login)

module.exports = router