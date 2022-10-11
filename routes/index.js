const router = require("express").Router();
const routerPatient = require("./patient")
const routerDoctor = require("./doctor")
const routerAppointment = require("./appointment")

router.use("/patients", routerPatient)
router.use("/doctors", routerDoctor)
router.use("/appointments", routerAppointment)

module.exports = router