const router = require("express").Router();

const authentication = require("../middleware/authentication");
const routerUser = require("./routerUser");
const routerInvitation = require('./routerInvitation');

router.use(routerUser);
router.use(authentication)
router.use(routerInvitation)

module.exports = router;
