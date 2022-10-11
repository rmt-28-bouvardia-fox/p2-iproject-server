"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConsultationReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConsultationReport.belongsTo(models.Appointment, {
        foreignKey: "AppointmentId",
      });
    }
  }
  ConsultationReport.init(
    {
      diagnosis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Diagnosis is required" },
          notEmpty: { msg: "Diagnosis is required" },
        },
      },
      needSurgicalAction: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "Choose if surgical action is needed" },
          notEmpty: { msg: "Choose if surgical action is needed" },
        },
      },
      needMedicalDrug: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "Choose if medical drug is needed" },
          notEmpty: { msg: "Choose if medical drug is needed" },
        },
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Cost is required" },
          notEmpty: { msg: "Cost is required" },
        },
      },
      AppointmnetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Appointment id is required" },
          notEmpty: { msg: "Appointment id is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "ConsultationReport",
    }
  );
  return ConsultationReport;
};
