'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email:{
      type : DataTypes.STRING,
      validate : {
       isEmail : {
        msg : "Must be email format"
       },
        notEmpty : {
          msg : "Password cannot be empty, please insert Password"
        }
      }
    },
    username:{
      type : DataTypes.STRING,
      validate : {
        min : 6,
        notEmpty : {
          msg : "Password cannot be empty, please insert Password"
        }
      }
    },
    password:{
      type : DataTypes.STRING,
      validate : {
        min : 6,
        notEmpty : {
          msg : "Password cannot be empty, please insert Password"
        }
      }
    },
    address:{
      type : DataTypes.STRING,
    },
    phoneNumber: {
      type : DataTypes.STRING,
      validate : {
        min : 11,
        notEmpty : {
          msg : "Phone number cannot be empty, please insert Password"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((app, opt) => {
    app.password = hash(app.password)
  })
  return User;
};