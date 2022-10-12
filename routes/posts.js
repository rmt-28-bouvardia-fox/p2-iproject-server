const express = require("express");
const PostController = require("../controllers/postController");
const upload = require("../middlewares/multer");
const router = express.Router();

router.post("/", PostController.createPosts);
router.post(
  "/memeMulter",
  upload.single("meme"),
  PostController.createMemeMulter
);
router.get("/memes", PostController.getAllMemes);
router.post("/:id/like", PostController.likePost);
router.get("/:id", PostController.showPost);

module.exports = router;
