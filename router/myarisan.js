const Controller = require("../controller/arisan")
const router = require("express").Router()

router.get("/", Controller.fetchMyArisan)
router.post("/:id", Controller.addMyArisan)

module.exports = router