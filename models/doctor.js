"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.Patient, {
        through: models.Appointment,
        foreignKey: "DoctorId",
      });
    }
  }
  Doctor.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email must be unique" },
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Email format is invalid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      specialist: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Specialist is required" },
          notEmpty: { msg: "Specialist is required" },
        },
      },
      SpecialistId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Specialist id is required" },
          notEmpty: { msg: "Specialist id is required" },
        },
      },
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  Doctor.beforeCreate((doctor) => {
    doctor.password = hash(doctor.password);
  });
  return Doctor;
};
