const express = require("express");
const Controller = require("../controller/customerController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", Controller.customerRegister);
router.post("/login", Controller.customerLogin);

router.use(authentication);

router.get("/chat");
router.get("/games", Controller.gameCustomer);
router.post("/wishlist", Controller.addWishlist);
router.get("/wishlist", Controller.fetchWishlist);
router.get("/wishlist/:id", Controller.fethcOneWishlist);
router.delete("/wishlist/:id", Controller.deleteWishlist);

module.exports = router;
