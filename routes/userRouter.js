const UserController = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-sign-in", UserController.googleLogin);

module.exports = router;
