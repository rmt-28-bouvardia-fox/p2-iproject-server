const router = require("express").Router();
const controllerPatient = require("../controllers/controllerPatient")

router.post("/register", controllerPatient.registerPatient)
router.post("/login", controllerPatient.loginPatient)

module.exports = router