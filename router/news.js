const router = require("express").Router();
const NewsController = require("../Controllers/newsController");

router.get("/", NewsController.getTopHeadlinesNews);
router.get("/sources", NewsController.getNewsSources);
module.exports = router;
