'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {onDelete : 'cascade', onUpdate : 'cascade'})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : `Username has already registered`
      },
      validate : {
        notEmpty : {
          msg : `Username can't be empty`
        },
        notNull : {
          msg : `Username can't be empty`
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : `Email has already registered`
      },
      validate : {
        notEmpty : {
          msg : `Email can't be empty`
        },
        notNull : {
          msg : `Email can't be empty`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Password can't be empty`
        },
        notNull : {
          msg : `Password can't be empty`
        },
        len : {
          args : [8,32],
          msg : `Password length must between 8 and 32 characters`
        }
      }
    },
    firstName : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `First name can't be empty`
        },
        notNull : {
          msg : `First name can't be empty`
        },
      }
    },
    lastName : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Last name can't be empty`
        },
        notNull : {
          msg : `Last name can't be empty`
        },
      }
    },
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user,option) =>{
    user.password = encrypt(user.password)
  })
  return User;
};