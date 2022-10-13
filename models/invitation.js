"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invitation.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Invitation.belongsTo(models.Template,{
        foreignKey: "TemplateId"
      })
    }
  }
  Invitation.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId is required" },
          notNull: { msg: "UserId is required" },
        },
      },
      groomName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Groom's name is required" },
          notNull: { msg: "Groom's name is required" },
        },
      },
      fatherGroom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "The name of the groom's father is required" },
          notNull: { msg: "The name of the groom's father is required" },
        },
      },
      motherGroom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "The name of the groom's mother is required" },
          notNull: { msg: "The name of the groom's mother is required" },
        },
      },
      BrideName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Bride's name is required" },
          notNull: { msg: "Bride's name is required" },
        },
      },
      fatherBride: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "The name of the bride's father is required" },
          notNull: { msg: "The name of the bride's father is required" },
        },
      },
      motherBride: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "The name of the bride's mother is required" },
          notNull: { msg: "The name of the bride's mother is required" },
        },
      },
      weddingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Wedding Date is required" },
          notNull: { msg: "Wedding Date is required" },
        },
      },
      weddingLocation: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Wedding Location is required" },
          notNull: { msg: "Wedding Location is required" },
        },
      },
      coupleName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Couple name is required" },
          notNull: { msg: "Couple name is required" },
        },
      },
      TemplateId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
          notEmpty: { msg: "Template is required" },
          notNull: { msg: "Template is required" },
        },
      },
      maps: {
        type: DataTypes.TEXT,
        allowNull:true
      },
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
