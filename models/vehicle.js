'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.hasMany(models.MyVehicle, {foreignKey: 'VehicleId'})
    }
  }
  Vehicle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Name is required !'
        },
        notEmpty: {
          msg: 'Name is required !'
        }
      }
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Picture is required !'
        },
        notEmpty: {
          msg: 'Picture is required !'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Description is required !'
        },
        notEmpty: {
          msg: 'Description is required !'
        }
      }
    },
    perDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Price per day is required !'
        },
        notEmpty: {
          msg: 'Price per day is required !'
        }
      }
    },
    perWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Price per week is required !'
        },
        notEmpty: {
          msg: 'Price per week is required !'
        }
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Capacity is required !'
        },
        notEmpty: {
          msg: 'Capacity is required !'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};