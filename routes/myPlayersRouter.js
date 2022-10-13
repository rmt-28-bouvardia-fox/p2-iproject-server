const PlayerController = require('../controllers/playerController')
const router = require('express').Router()

router.get('/', PlayerController.showMyPlayers)
router.get('/:id', PlayerController.findMyPlayer)
router.delete('/:id', PlayerController.sellPlayer)

module.exports = router