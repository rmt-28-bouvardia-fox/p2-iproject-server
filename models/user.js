'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {as: 'OwnerProduct', foreignKey: "OwnerId"})
      User.hasMany(models.Product, {as: 'BidderProduct',foreignKey: "BidderId"})
      User.hasMany(models.UserProduct, {foreignKey: "UserId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "username required"},
        notNull: {msg: "username required"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "email must be unique"},
      validate: {
        notEmpty: {msg: "email required"},
        notNull: {msg: "email required"},
        isEmail: {msg: "invalid email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "password required"},
        notNull: {msg: "password required"}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "role required"},
        notNull: {msg: "role required"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password)
  })
  return User;
};