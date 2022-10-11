const router = require("express").Router();
const NewsController = require("../Controllers/newsController");

router.get("/news", NewsController.getNews);

module.exports = router;
