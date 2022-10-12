const Controller = require("../controller/arisan")
const router = require("express").Router()
router.get("/", Controller.fetchArisan)
router.post("/", Controller.addArisan)
router.get("/log", Controller.fetchLogTransaction)
router.patch("/log/:id", Controller.payTrans)
module.exports = router