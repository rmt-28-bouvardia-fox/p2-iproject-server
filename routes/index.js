const userRouter = require('./userRouter')
const teamRouter = require('./teamRouter')
const authentication = require('../midddleware/authentication')
const router = require('express').Router()


router.use('/users', userRouter)

router.use('/teams', teamRouter)

module.exports = router