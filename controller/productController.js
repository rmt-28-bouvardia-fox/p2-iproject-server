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
}

module.exports = ProductController;
