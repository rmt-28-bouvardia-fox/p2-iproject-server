const express = require("express");
const PostController = require("../controllers/postController");
const router = express.Router();

router.get("/", PostController.showAllPosts);
router.post("/", PostController.createPosts);


module.exports = router;
