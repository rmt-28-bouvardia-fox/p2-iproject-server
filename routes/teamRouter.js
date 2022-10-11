const TeamController = require('../controllers/teamController')
const authentication = require('../midddleware/authentication')
const generateTeam = require('../midddleware/generateTeamId')

const router = require('express').Router()


router.post('/', TeamController.createTeam)
router.use(generateTeam)
router.get('/', TeamController.teamProfile)
router.post('/randomBuy', TeamController.getRandomPlayer)
router.get('/formattion', TeamController.formattion)
router.post('/:playerId', TeamController.buyPlayer)
// router.use('/', )

module.exports = router