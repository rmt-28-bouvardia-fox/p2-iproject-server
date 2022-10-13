const express = require("express");
const PaymentController = require("../controllers/payment-controller");
const authn = require('../middlewares/authn')
const routerPayment = express.Router();

routerPayment.post("/", authn, PaymentController.postPayment);
routerPayment.patch("/", authn, PaymentController.updatePaymentStatus);

module.exports = routerPayment;