const express = require('express')
const ComicController = require('../Controllers/comicController')
const router = express.Router()


router.get('/', ComicController.getComic)

module.exports = router