const router = require("express").Router();
const controllerPatient = require("../controllers/controllerPatient")

router.post("/register", controllerPatient.registerPatient)
router.post("/login", controllerPatient.loginPatient)
router.use(require("../middlewares/loginAuthentication"))
router.use(require("../middlewares/patientAuthorization"))
router.get("/patientdetails", controllerPatient.getPatientDetail)
router.post("/patientdetails", controllerPatient.createDetail)
router.put("/patientdetails/:id", controllerPatient.updateDetail)

module.exports = router