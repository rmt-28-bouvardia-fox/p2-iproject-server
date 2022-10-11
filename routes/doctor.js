const router = require("express").Router();
const controllerDoctor = require("../controllers/controllerDoctor")

router.post("/register", controllerDoctor.registerDoctor)
router.post("/login", controllerDoctor.loginDoctor)

module.exports = router