const Controller = require('../controllers/authController')

const router = require('express').Router()

router.post('/register',Controller)

router.post('/login',Controller)

router.post('/googleLogin',Controller)

router.post('/facebookLogin',Controller)

module.exports = router