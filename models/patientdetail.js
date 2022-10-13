"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientDetail.belongsTo(models.Patient, { foreignKey: "PatientId" });
    }
  }
  PatientDetail.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Birth date is required" },
          notEmpty: { msg: "Birth date is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address is required" },
          notEmpty: { msg: "Address is required" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Gender is required" },
          notEmpty: { msg: "Gender is required" },
        },
      },
      bloodType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Blood type is required" },
          notEmpty: { msg: "Blood type is required" },
        },
      },
      diseaseHistory: DataTypes.TEXT,
      PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Patient id is required" },
          notEmpty: { msg: "Patient id is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "PatientDetail",
    }
  );
  PatientDetail.beforeCreate((patientDetail) => {
    if (patientDetail.diseaseHistory == "" || !patientDetail.diseaseHistory) {
      patientDetail.diseaseHistory =
        "This patient hasn't submitted disease history.";
    }
  });
  return PatientDetail;
};
