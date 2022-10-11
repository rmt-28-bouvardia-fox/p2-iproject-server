const router = require("express").Router();
const NewsController = require("../Controllers/newsController");

router.get("/news", NewsController.getTopHeadlinesNews);

module.exports = router;
