'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyVehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyVehicle.belongsTo(models.Vehicle, {foreignKey: 'VehicleId'})
      MyVehicle.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  MyVehicle.init({
    VehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    status: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: function (MyVehicle) {
        MyVehicle.status = 'pending'
      }
    },
    sequelize,
    modelName: 'MyVehicle',
  });
  return MyVehicle;
};