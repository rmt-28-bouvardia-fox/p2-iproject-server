'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {as: 'OwnerProduct', foreignKey: "OwnerId"})
      Product.belongsTo(models.User, {as: 'BidderProduct', foreignKey: "BidderId"})
      Product.hasMany(models.UserProduct, {foreignKey: "ProductId"})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    OwnerId: DataTypes.INTEGER,
    BidderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};