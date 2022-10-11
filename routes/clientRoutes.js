const ClientController = require('../Controllers/clientController')
const router = require('express').Router()

router.post('/register', ClientController.register)

module.exports = router