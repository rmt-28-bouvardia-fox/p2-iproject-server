const router = require("express").Router();
const controllerPatient = require("../controllers/controllerPatient")

router.post("/register", controllerPatient.registerPatient)
router.post("/login", controllerPatient.loginPatient)
router.use(require("../middlewares/loginAuthentication"))
router.post("/patientdetails", controllerPatient.createDetail)

module.exports = router