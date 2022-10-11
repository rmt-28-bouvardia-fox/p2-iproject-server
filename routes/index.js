const router = require("express").Router();
const routerPatient = require("./patient")

router.use("/patients", routerPatient)

module.exports = router