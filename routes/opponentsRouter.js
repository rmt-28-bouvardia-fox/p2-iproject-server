const router = require('express').Router()
const OpponentsController = require('../controllers/opponentsController')

router.get('/', OpponentsController.showAllOpponents)
router.get('/:id', OpponentsController.playWithOpponents)

module.exports = router