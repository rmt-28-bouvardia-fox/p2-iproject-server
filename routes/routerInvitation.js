const router = require("express").Router();
const authorization = require("../middleware/authorization");
const Controller = require("./../controller/invitation");

router.post("/create", Controller.createInvitation);
router.get("/:coupleName", Controller.readInvitation);
router.put("/:coupleName", authorization, Controller.updateInvitation);

module.exports = router;
