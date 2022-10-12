const express = require("express");
const PostController = require("../controllers/postController");
const router = express.Router();

router.post("/", PostController.createPosts);
router.get("/memes", PostController.getAllMemes);
router.post("/:id/like", PostController.likePost);
router.get("/:id", PostController.showPost);

module.exports = router;
