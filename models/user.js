'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/bcrypt');
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
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:`username is required`},
        notEmpty:{msg:`username is required`}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:`email is required`},
        notEmpty:{msg:`email is required`},
        isEmail:{msg:`use email format`}
      },
      unique:{
        name:true,
        msg:`email is already use`
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:`password is required`},
        notEmpty:{msg:`password is required`},
        len:{
          args:[5],
          msg:`password minimum character is 5`
        }
      }
    },
    status:{
      type:DataTypes.STRING,
      defaultValue:`Standard`
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => el.password = hash(el.password))
  return User;
};