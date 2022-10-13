const router = require('express').Router()
const ComicController = require('../Controllers/comicController')


router.get('/', ComicController.getComics)
router.get('/:comicId', ComicController.getComic)

module.exports = router