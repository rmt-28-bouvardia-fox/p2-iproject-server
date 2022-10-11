const express = require("express");
const Controller = require("../controller/customerController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", Controller.customerRegister);
router.post("/login", Controller.customerLogin);

router.use(authentication);

router.get("/games", Controller.gameCustomer);

module.exports = router;
