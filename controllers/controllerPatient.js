const { Patient, PatientDetail } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const registerPatient = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.create({
      email,
      password,
    });
    res.status(201).json({ id: patient.id, email: patient.email });
  } catch (error) {
    next(error);
  }
};

const loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw { name: `invalid_email` };
    }
    if (!password) {
      throw { name: `invalid_password` };
    }
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      throw { name: `invalid_credentials` };
    }
    const passwordValidate = compare(password, patient.password);
    if (!passwordValidate) {
      throw { name: `invalid_credentials` };
    }
    const payload = {
      id: patient.id,
      email: patient.email
    };
    const access_token = createToken(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};
const createDetail = async (req, res, next) => {
  try {
    const id = +req.user.id
    const { name, birthDate, address, gender, bloodType, diseaseHistory } =
      req.body;
    const patientDetail = await PatientDetail.create({
      name,
      birthDate,
      address,
      gender,
      bloodType,
      diseaseHistory,
      PatientId: id
    });
    res.status(201).json(patientDetail)
  } catch (error) {
    next(error);
  }
};
module.exports = { registerPatient, loginPatient, createDetail };
