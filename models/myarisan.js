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
      MyArisan.belongsTo(models.User, {foreignKey : "UserId"})
      MyArisan.belongsTo(models.Arisan, {foreignKey : "ArisanId"})
    }
  }
  MyArisan.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ArisanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyArisan',
  });
  return MyArisan;
};