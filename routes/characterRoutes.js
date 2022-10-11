const router = require('express').Router()
const CharacterController = require('../Controllers/characterController')


router.get('/', CharacterController.getAllCharacters)


module.exports = router