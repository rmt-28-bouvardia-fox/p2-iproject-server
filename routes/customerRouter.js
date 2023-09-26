const express = require("express");
const Controller = require("../controller/customerController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", Controller.customerRegister);
router.post("/login", Controller.customerLogin);

router.use(authentication);

router.get("/games", Controller.gameCustomer);
router.post("/wishlist", Controller.addWishlist);
router.get("/wishlist", Controller.fetchWishlist);
router.get("/buygame/:price", Controller.buyGame);
// router.post("/order", Controller.addOrder);
// router.get("/order", Controller.fetchOrder);
router.get("/wishlist/:id", Controller.fethcOneWishlist);
router.delete("/wishlist/:id", Controller.deleteWishlist);

module.exports = router;
