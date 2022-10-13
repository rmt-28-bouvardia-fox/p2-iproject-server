const userRouter = require('./userRouter')
const teamRouter = require('./teamRouter')
const playerRouter = require('./player')
const opponentsRouter = require('./opponentsRouter')
const authentication = require('../midddleware/authentication')
const generateTeam = require('../midddleware/generateTeamId')
const router = require('express').Router()


router.use('/users', userRouter)
router.use(authentication)
router.use('/teams', teamRouter)
router.use(generateTeam)
router.use('/opponents', opponentsRouter)
router.use('/players', playerRouter)

module.exports = router