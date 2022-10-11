const { Patient, PatientDetail } = require("../models");
const patientAuthorization = async (req, res, next) => {
  try {
    const email = req.user.email;
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = patientAuthorization;
