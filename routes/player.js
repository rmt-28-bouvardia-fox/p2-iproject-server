const PlayerController = require('../controllers/playerController')
const router = require('express').Router()

router.get('/', PlayerController.showAllPlayers)
router.get('/mongo', PlayerController.showMongoPlayers)
router.post('/insertPlayer', PlayerController.addPlayersToMongo)

module.exports = router