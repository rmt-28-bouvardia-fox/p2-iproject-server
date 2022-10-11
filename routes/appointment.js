const router = require("express").Router();
const controllerAppointment = require("../controllers/controllerAppointment");
const patientAuthorization = require("../middlewares/patientAuthorization");
const doctorAuthorization = require("../middlewares/doctorAuthorization");

router.use(require("../middlewares/loginAuthentication"));
router.post("/", patientAuthorization, controllerAppointment.createAppointment);
router.get("/patients", patientAuthorization, controllerAppointment.getAllPatientAppointment)
router.get("/doctors", doctorAuthorization, controllerAppointment.getAllDoctorAppointment)
router.post(
  "/consultationReports/:appointmentId",
  doctorAuthorization,
  controllerAppointment.createConsultReport
);

module.exports = router;