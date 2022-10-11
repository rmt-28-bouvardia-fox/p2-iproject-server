const { Doctor } = require("../models");
const doctorAuthorization = async (req, res, next) => {
  try {
    const email = req.user.email;
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = doctorAuthorization;