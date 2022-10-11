const userRouter = require('./userRouter')
const teamRouter = require('./teamRouter')
const playerRouter = require('./player')
const authentication = require('../midddleware/authentication')
const router = require('express').Router()


router.use('/users', userRouter)
router.use(authentication)
router.use('/players', playerRouter)
router.use('/teams', teamRouter)

module.exports = router