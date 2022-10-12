const Controller = require("../controller/arisan")
const router = require("express").Router()

router.get("/", Controller.fetchMyArisan)
router.post("/:id", Controller.addMyArisan)
router.post("/:id", Controller.addTransaction)

module.exports = router