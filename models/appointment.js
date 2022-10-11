'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    chiefComplaint: DataTypes.STRING,
    symptom: DataTypes.STRING,
    appointmentDate: DataTypes.DATE,
    status: DataTypes.STRING,
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};