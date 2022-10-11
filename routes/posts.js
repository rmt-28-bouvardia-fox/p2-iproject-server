const express = require("express");
const PostController = require("../controllers/postController");
const router = express.Router();

router.get("/", PostController.showAllPosts);
router.post("/", PostController.createPosts);
router.get("/memes", PostController.getAllMemes);

module.exports = router;
