const router = require('express').Router()
const Controller = require('./../controller/invitation');

router.post('/create', Controller.createInvitation)

module.exports = router