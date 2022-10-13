const express = require('express')
const router = express.Router()
const MyBidController = require("../controller/MyBidController");

router.post("/", MyBidController.saveBid);

router.patch("/:id", MyBidController.placeBid);

router.get("/winning", MyBidController.winningBids);

router.get("/selling", MyBidController.sellingBids);

router.post("/payment", MyBidController.paymentBid);

router.post("/payment-callback", MyBidController.paymentCallback);

module.exports = router