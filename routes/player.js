const PlayerController = require('../controllers/playerController')
const router = require('express').Router()

router.get('/', PlayerController.showAllPlayers)
router.post('/randomBuy', PlayerController.getRandomPlayer)
router.get('/myPlayers/:teamId', PlayerController.showMyPlayers)
router.get('/:id', PlayerController.findPlayer)
router.post('/:id', PlayerController.buyPlayer)

module.exports = router