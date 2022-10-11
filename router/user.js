const UserController = require("../controller/userController")
const user = require("express").Router()

user.post("/login", UserController.LoginUser)
user.post("/register", UserController.registerUser)
user.post("/google-sign-in", UserController)
user.post("/facebook-sign-in", UserController)

module.exports = user