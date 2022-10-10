const authentication = require("../middlewares/authentication")
const app = require("express").Router()
const userRouter = require("../router/user")
app.use("/users", userRouter)
app.use(authentication)
app.use("/arisan")
app.use("/forum")

module.exports = app