const router = require("express").Router();
const NewsController = require("../Controllers/newsController");

router.get("/", NewsController.getTopHeadlinesNews);

module.exports = router;
