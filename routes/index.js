const router = require("express").Router();
const Controller = require('./../controller/invitation');

const authentication = require("../middleware/authentication");
const routerUser = require("./routerUser");
const routerInvitation = require('./routerInvitation');

router.use(routerUser);
router.get("/template", Controller.getTemplate)
router.get("/:coupleName", Controller.readInvitation);

router.use(authentication)
router.use(routerInvitation)

module.exports = router;