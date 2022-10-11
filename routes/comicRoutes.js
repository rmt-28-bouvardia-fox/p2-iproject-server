const router = require('express').Router()
const ComicController = require('../Controllers/comicController')


router.get('/', ComicController.getComics)

module.exports = router