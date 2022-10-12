const router = require('express').Router()
const Controller = require('./../controller/user');

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/google-sign-in', Controller.loginGoogle)

module.exports = router