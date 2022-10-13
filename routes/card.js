const express = require("express");
const router = express.Router();
const CardController = require("../controller/CardController");

router.post("/details", CardController.details);

router.get("/search", CardController.search);

module.exports = router;
