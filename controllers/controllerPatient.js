const { Patient } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw { name: `invalid_email` };
    }
    if (!password) {
      throw { name: `invalid_password` };
    }
    const user = await Patient.findOne({ where: { email } });
    if (!user) {
      throw { name: `invalid_credentials` };
    }
    const passwordValidate = compare(password, user.password);
    if (!passwordValidate) {
      throw { name: `invalid_credentials` };
    }
    const payload = {
      id: user.id,
    };
    const access_token = createToken(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginPatient };
