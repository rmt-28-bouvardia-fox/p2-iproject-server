const router = require("express").Router();
const routerPatient = require("./patient")
const routerDoctor = require("./doctor")

router.use("/patients", routerPatient)
router.use("/doctors", routerDoctor)

module.exports = router