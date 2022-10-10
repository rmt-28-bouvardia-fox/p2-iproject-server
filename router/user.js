const UserController = require("../controller/userController")

const app = require("express").Router()

app.post("/login", UserController.LoginUser)
app.post("/register")
app.post("/google-sign-in")
app.post("/facebook-sign-in")

module.exports = app