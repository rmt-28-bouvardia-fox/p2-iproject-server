'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyVehicle, {foreignKey: 'UserId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Username is required !'
        },
        notEmpty: {
          msg: 'Username is required !'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Password is required !'
        },
        notEmpty: {
          msg: 'Password is required !'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull : {
          msg : 'Email is required !'
        },
        notEmpty: {
          msg: 'Email is required !'
        },
        isEmail:{
          msg: 'Email must be in email format !'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: function (User){
        User.password = bcryptjs.hashSync(User.password, 7)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};