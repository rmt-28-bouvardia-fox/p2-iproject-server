const PlayerController = require('../controllers/playerController')
const router = require('express').Router()

router.get('/', PlayerController.showMyPlayers)

module.exports = router