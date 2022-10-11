const authentication = require("../middlewares/authentication")
const router = require("express").Router()
const userRouter = require("../router/user")

router.use("/users", userRouter)
router.use(authentication)
// router.use("/arisan")
// router.use("/forum")

module.exports = router