const router = require("express").Router();
const NewsController = require("../Controllers/newsController");

router.get("/", NewsController.getTopHeadlinesNews);
router.post("/midtrans", NewsController.midtrans);
router.patch("/status", NewsController.updateStatus);
module.exports = router;
