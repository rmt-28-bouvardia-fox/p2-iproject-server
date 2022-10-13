const express = require('express')
const router = express.Router()
const comic = require('./comicRoutes')
const client = require('./clientRoutes')
const character = require('./characterRoutes')
const order = require('./orderRoutes')
const authentication = require('../middlewares/authentication')

router.get('/', (req,res) =>{
    res.status(200).json({message : 'asdfd'})
})
router.use('/comics', comic)
router.use('/clients', client)

router.use('/characters', character)
router.use(authentication)
router.use('/orders', order)

module.exports = router