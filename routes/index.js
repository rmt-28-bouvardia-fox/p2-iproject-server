const express = require('express')
const router = express.Router()
const comic = require('./comicRoutes')

router.get('/', (req,res) =>{
    res.status(200).json({message : 'asdfd'})
})
router.use('/comics', comic)

module.exports = router