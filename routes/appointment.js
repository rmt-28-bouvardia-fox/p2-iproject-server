const router = require("express").Router();
const controllerAppointment = require("../controllers/controllerAppointment")
const patientAuthorization = require("../middlewares/patientAuthorization")

router.use(require("../middlewares/loginAuthentication"))
router.post("/", patientAuthorization, controllerAppointment.createAppointment)

module.exports = router