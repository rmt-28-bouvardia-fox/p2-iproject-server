const express = require("express");
const router = express.Router();
const card = require("./card");
const mybid = require("./my-bid")

const authentication = require("../middlewares/authentication");

const AuthController = require("../controller/AuthController");
const MyBidController = require("../controller/MyBidController");

router.get("/", (req, res) => {
  res.send("REST API is online");
});

router.post("/login", AuthController.postLogin);
router.post("/register", AuthController.postRegister);
router.post("/login-google", AuthController.postLoginGoogle);

router.get("/bid/:id", MyBidController.detailBid);

router.use("/card", card);

// AUTHENTICATION
router.use(authentication);

router.get("/user", AuthController.getUser);

router.use("/my-bid", mybid)

module.exports = router;
