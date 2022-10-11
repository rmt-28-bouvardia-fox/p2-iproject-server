const router = require("express").Router();
const controllerPatient = require("../controllers/controllerPatient")

router.post("/login", controllerPatient.loginPatient)

module.exports = router