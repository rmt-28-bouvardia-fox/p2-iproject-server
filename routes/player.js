const PlayerController = require('../controllers/playerController')
const router = require('express').Router()
const myPlayerRouter = require('./myPlayersRouter')

router.get('/', PlayerController.showAllPlayers)
router.post('/randomBuy', PlayerController.getRandomPlayer)

router.use('/myPlayers', myPlayerRouter)

router.get('/:id', PlayerController.findPlayer)
router.post('/:id', PlayerController.buyPlayer)

module.exports = router