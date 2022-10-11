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
const loginDoctor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw { name: `invalid_email` };
    }
    if (!password) {
      throw { name: `invalid_password` };
    }
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor) {
      throw { name: `invalid_credentials` };
    }
    const passwordValidate = compare(password, doctor.password);
    if (!passwordValidate) {
      throw { name: `invalid_credentials` };
    }
    const payload = {
      id: doctor.id,
      email: doctor.email,
    };
    const access_token = createToken(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};
module.exports = { registerDoctor, loginDoctor };
