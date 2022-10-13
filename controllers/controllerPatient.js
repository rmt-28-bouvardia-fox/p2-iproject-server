const { Patient, PatientDetail } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const axios = require("axios");
const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");

const registerPatient = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { data } = await axios({
      method: "get",
      url: "https://emailvalidation.abstractapi.com/v1/",
      params: {
        api_key: ABSTRACT_API_KEY,
        email,
      },
    });
    if (data.deliverability !== "DELIVERABLE") {
      throw { name: "invalid_email_address" };
    }
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
      email: patient.email,
    };
    const access_token = createToken(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};
const loginGoogle = async (req, res, next) => {
  try {
    const { google_token } = req.headers;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.payload;
    const [patient, created] = await Patient.findOrCreate({
      where: { email: payload.email },
      defaults: {
        email: payload.email,
        password: "google_auth",
      },
      hooks: false,
    });
    const access_token = createToken({
      id: patient.id,
      email: patient.email,
    });
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};
const getPatientDetail = async (req, res, next) => {
  try {
    const id = +req.user.id;
    const patient = await PatientDetail.findOne({ where: { PatientId: id } });
    if (!patient) {
      throw { name: "data_not_found" };
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};
const createDetail = async (req, res, next) => {
  try {
    const id = +req.user.id;
    const { name, birthDate, address, gender, bloodType, diseaseHistory } =
      req.body;
    const duplicate = await PatientDetail.findOne({ where: { PatientId: id } });
    if (duplicate) {
      throw { name: "duplicate_patient_details" };
    }
    const patientDetail = await PatientDetail.create({
      name,
      birthDate,
      address,
      gender,
      bloodType,
      diseaseHistory,
      PatientId: id,
    });
    res.status(201).json(patientDetail);
  } catch (error) {
    next(error);
  }
};
const updateDetail = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const email = req.user.email;
    const { name, birthDate, address, gender, bloodType, diseaseHistory } =
      req.body;
    const patientDetail = await PatientDetail.findOne({ where: { id } });
    if (!patientDetail) {
      throw { name: "data_not_found" };
    }
    const patient = await Patient.findOne({ where: { email } });
    if (patientDetail.PatientId != patient.id) {
      throw { name: "forbidden" };
    }
    await PatientDetail.update(
      {
        name,
        birthDate,
        address,
        gender,
        bloodType,
        diseaseHistory,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Patient detail has been updated" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerPatient,
  loginPatient,
  loginGoogle,
  getPatientDetail,
  createDetail,
  updateDetail,
};
