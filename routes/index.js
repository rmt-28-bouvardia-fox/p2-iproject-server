const express = require('express')
const router = express.Router()
const comic = require('./comicRoutes')
const client = require('./clientRoutes')

router.get('/', (req,res) =>{
    res.status(200).json({message : 'asdfd'})
})
router.use('/comics', comic)
router.use('/clients', client)

module.exports = router