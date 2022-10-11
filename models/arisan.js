'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arisan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
c    }
  }
  Arisan.init({
    name: DataTypes.STRING,
    expiredAt: DataTypes.STRING,
    people: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Arisan',
  });
  return Arisan;
};