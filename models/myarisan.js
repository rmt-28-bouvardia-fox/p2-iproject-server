'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyArisan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MyArisan.init({
    UserId: DataTypes.INTEGER,
    ArisanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyArisan',
  });
  return MyArisan;
};