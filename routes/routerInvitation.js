const router = require("express").Router();
const authorization = require("../middleware/authorization");
const Controller = require("./../controller/invitation");

router.post("/create", Controller.createInvitation);
router.get("/:coupleName", Controller.getTemplate)
router.patch("/:coupleName", Controller.chooseTemplate);

router.put("/:coupleName", authorization, Controller.updateInvitation);
router.delete("/:coupleName", authorization, Controller.deleteInvitation)

module.exports = router;
