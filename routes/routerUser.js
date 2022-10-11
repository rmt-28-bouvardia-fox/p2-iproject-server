const router = require('express').Router()
const Controller = require('./../controller/user');

router.post('/register', Controller.register)

module.exports = router