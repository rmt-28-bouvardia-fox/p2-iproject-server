const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const newsRouter = require("./news");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use(authentication);
router.use("/news", newsRouter);

module.exports = router;
