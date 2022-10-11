// const authentication = require("../middlewares/authentication");

const router = require("express").Router();
const userRouter = require("./userRouter");

router.use("/users", userRouter);

//authentication
// router.use(authentication);

module.exports = router;
