const express = require('express')
const router = express.Router()
const comic = require('./comicRoutes')
const client = require('./clientRoutes')
const character = require('./characterRoutes')

router.get('/', (req,res) =>{
    res.status(200).json({message : 'asdfd'})
})
router.use('/comics', comic)
router.use('/clients', client)
router.use('/characters', character)

module.exports = router