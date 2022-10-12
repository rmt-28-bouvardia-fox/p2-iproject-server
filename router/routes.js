const router = require('express').Router()
const authRouter = require('./authRouter')
const musicRouter = require('./musicRouter')

router.use('/auth',authRouter)

router.use('/music',musicRouter)

module.exports = router