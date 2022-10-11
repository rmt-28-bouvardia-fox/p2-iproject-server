"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Patient, { foreignKey: "PatientId" });
      Appointment.belongsTo(models.Doctor, { foreignKey: "DoctorId" });
      Appointment.hasOne(models.ConsultationReport, {
        foreignKey: "AppointmentId",
      });
    }
  }
  Appointment.init(
    {
      chiefComplaint: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Chief complaint is required" },
          notEmpty: { msg: "Chief complaint is required" },
        },
      },
      symptom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Symptom is required" },
          notEmpty: { msg: "Symptom is required" },
        },
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Appointment date is required" },
          notEmpty: { msg: "Appointment date is required" },
        },
      },
      status: DataTypes.STRING,
      PatientId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Patient id is required" },
          notEmpty: { msg: "Patient id is required" },
        },
      },
      DoctorId: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Doctor id is required" },
          notEmpty: { msg: "Doctor id is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  Appointment.beforeCreate((appointment) => {
    appointment.status = "Uncomplete";
  });
  return Appointment;
};
