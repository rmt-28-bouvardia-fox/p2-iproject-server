const router = require('express').Router()
const Controller = require('./../controller/invitation');

router.post('/create', Controller.createInvitation)
router.get('/:coupleName', Controller.readInvitation)

module.exports = router