const express = require("express");
const PostController = require("../controllers/postController");
const router = express.Router();

router.get("/", PostController.showAllPosts);
router.get("/user", PostController.showUserPost);
router.post("/", PostController.createPosts);
router.get("/memes", PostController.getAllMemes);
router.post("/:id/like", PostController.likePost);
router.delete("/:id", PostController.deletePost);
router.put("/:id", PostController.editPost);

module.exports = router;
