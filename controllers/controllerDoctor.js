const { Doctor } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Op } = require("sequelize");

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
const getAllDoctor = async (req, res, next) => {
  const { page } = req.query;
  const paramQuerySQL = {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  };
  let limit;
  let offset;
  if (page !== "" && typeof page !== "undefined") {
    if (page.size !== "" && typeof page.size !== "undefined") {
      limit = page.size;
      paramQuerySQL.limit = limit;
    }

    if (page.number !== "" && typeof page.number !== "undefined") {
      offset = page.number * limit - limit;
      paramQuerySQL.offset = offset;
    }
  } else {
    limit = 8; // default limit 8 item
    offset = 0;
    paramQuerySQL.limit = limit;
    paramQuerySQL.offset = offset;
  }
  try {
    const doctors = await Doctor.findAll(paramQuerySQL);
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};
const getAllSpecialist = async (req, res, next) => {
  const { specialistId } = req.query;
  const paramQuerySQL = { where: {} };
  if (specialistId !== "" && typeof specialistId !== "undefined") {
    const query = specialistId.split(",").map((item) => ({
      [Op.eq]: item,
    }));
    paramQuerySQL.where.SpecialistId = { [Op.or]: query };
  }
  try {
    const doctors = await Doctor.findAll(paramQuerySQL);
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerDoctor,
  loginDoctor,
  getAllDoctor,
  getAllSpecialist,
};
