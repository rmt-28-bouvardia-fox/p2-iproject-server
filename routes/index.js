const express = require("express");
const router = express.Router();
const customerRouter = require("./customerRouter");

router.use("/pub", customerRouter);

module.exports = router;
