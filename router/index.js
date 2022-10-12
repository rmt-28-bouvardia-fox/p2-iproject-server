const authentication = require("../middlewares/authentication")
const router = require("express").Router()
const userRouter = require("../router/user")
const arisanRouter = require("../router/arisan")
const logRouter = require("../router/log")
const myarisanROuter = require("../router/myarisan")

router.use("/users", userRouter)
router.use(authentication)
router.use("/arisan", arisanRouter)
router.use("/myarisan", myarisanROuter)
router.use("/log", logRouter)

module.exports = router