'use strict';
const {
  Model
} = require('sequelize');
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
          msg : "must be an email format"
        },
        notEmpty : {
          msg : "Email cannot be empty"
        },
        isNull : {
          msg : "Email cannot be empty"
        }
      }
    },
    username:{
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Username cannot be empty"
        },
        isNull : {
          msg : "Username cannot be empty"
        }
      }
    },
    password:{
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Password cannot be empty"
        },
        isNull : {
          msg : "Password cannot be empty"
        }
      }
    },
    address:{
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Address cannot be empty"
        },
        isNull : {
          msg : "Address cannot be empty"
        }
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Phone Number cannot be empty"
        },
        isNull : {
          msg : "Phone Number cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};