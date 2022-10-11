const { verifyToken } = require("../helpers/jwt");
const { Patient, Doctor } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalid_token" };
    }
    const payload = verifyToken(access_token);
    if (!payload) {
      throw { name: "invalid_token" };
    }
    const email = payload.email;
    const patient = await Patient.findOne({ where: { email } });
    const doctor = await Doctor.findOne({ where: { email } });
    if (!patient && !doctor) {
      throw { name: "invalid_token" };
    }
    if (patient) {
      req.user = { id: patient.id };
    } else if (doctor) {
      req.user = { id: doctor.id };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
