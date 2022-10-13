const Controller = require('../controllers/musicController')

const router = require('express').Router()

router.get('/',Controller.getMusic)

module.exports = router