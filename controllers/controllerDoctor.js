const { Doctor } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const registerDoctor = async (req, res, next) => {
  const { email, password, name, specialist, SpecialistId } = req.body;
  try {
    const doctor = await Doctor.create({
      email,
      password,
      name,
      specialist,
      SpecialistId,
    });
    res.status(201).json({ id: doctor.id, email: doctor.email });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerDoctor };
