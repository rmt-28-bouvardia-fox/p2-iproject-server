const { UserProduct } = require("../models");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    const myBidId = +req.params.id;
    const userId = req.user.id
    const list = await UserProduct.findByPk(myBidId);
    if (!list) {
      throw { name: "invalid" };
    }
    if (userId !== list.userId) {
        throw { name: "forbidden" };
      }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization
