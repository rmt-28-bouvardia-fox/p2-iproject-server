const express = require("express");
const Controller = require("../controller/customerController");
const router = express.Router();

router.post("/register", Controller.customerRegister);
router.post("/login", Controller.customerLogin);

module.exports = router;
