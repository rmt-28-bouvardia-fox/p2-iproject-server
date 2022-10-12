const router = require("express").Router();
const controllerAppointment = require("../controllers/controllerAppointment");
const controllerMidtrans = require("../controllers/controllerMidtrans");
const patientAuthorization = require("../middlewares/patientAuthorization");
const doctorAuthorization = require("../middlewares/doctorAuthorization");

router.use(require("../middlewares/loginAuthentication"));
router.post("/", patientAuthorization, controllerAppointment.createAppointment);
router.get(
  "/symptoms",
  patientAuthorization,
  controllerAppointment.getAllSymptom
);
router.get(
  "/specialists",
  patientAuthorization,
  controllerAppointment.getAllSpecialist
);
router.get(
  "/diagnoses",
  doctorAuthorization,
  controllerAppointment.getDiagnosis
);
router.get(
  "/patients",
  patientAuthorization,
  controllerAppointment.getAllPatientAppointment
);
router.get(
  "/doctors",
  doctorAuthorization,
  controllerAppointment.getAllDoctorAppointment
);
router.get(
  "/transactions",
  patientAuthorization,
  controllerMidtrans.midtransHandler
);
router.patch(
  "/:appointmentId",
  patientAuthorization,
  controllerAppointment.updateStatus
);
router.post(
  "/consultationReports/:appointmentId",
  doctorAuthorization,
  controllerAppointment.createConsultReport
);

module.exports = router;
