"use strict";
const express = require("express");
const UserController = require("../controllers/userController");
const PostController = require("../controllers/postController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/authentication", UserController.authentication);
router.post("/githubSignIn", UserController.githubSignIn);
router.get("/posts", PostController.showAllPosts);
router.post("/simsimi", UserController.simsimi);

router.use(authentication);

router.use("/posts", require("./posts"));

module.exports = router;
