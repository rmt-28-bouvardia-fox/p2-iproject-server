const { UserProduct } = require("../models");
const jwt = require("jsonwebtoken");


const authorization = async (req, res, next) => {
  try {
    console.log('masuk')
    const myBidId = +req.params.listId;
    const userId = +req.user.id
    const list = await UserProduct.findByPk(myBidId);
    if (!list) {
      throw { name: "invalid" };
    }
    if (userId !== list.UserId) {
        throw { name: "forbidden" };
      }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization
