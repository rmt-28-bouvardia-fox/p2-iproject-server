const { Product, User, OwnerProduct } = require("../models");

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll({
        include: ['OwnerProduct']
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
        const id = +req.params.id;
        const product = await Product.findOne({
            include: ['OwnerProduct']
        }, {where: {id}});
        if (product === null) {
          throw { name: "invalid" };
        } else {
          res.status(200).json(product);
        }
      } catch (error) {
        next(error);
      }
  }
}

module.exports = ProductController;
