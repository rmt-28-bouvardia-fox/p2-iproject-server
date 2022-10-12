// const authentication = require("../middlewares/authentication");

const router = require("express").Router();
const userRouter = require("./userRouter");
const recipeRouter = require("./recipeRouter");

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

//authentication
// router.use(authentication);

module.exports = router;
