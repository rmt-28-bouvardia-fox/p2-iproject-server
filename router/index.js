const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const newsRouter = require("./news");
const userRouter = require("./users");
const weaterRouter = require("./weather");

router.use("/users", userRouter);
router.use(authentication);
router.use("/news", newsRouter);
router.use("/weather", weaterRouter);

module.exports = router;
