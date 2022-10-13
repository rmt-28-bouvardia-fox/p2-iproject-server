const Controller = require("../controller/arisan")
const router = require("express").Router()
router.get("/", Controller.fetchLogTransaction)
router.patch("/:id", Controller.payTrans)
router.post("/", Controller.midtrans)
module.exports = router