const { Appointment, ConsultationReport } = require("../models");
const axios = require("axios");
const API_MEDIC_KEY = process.env.API_MEDIC_KEY;

const createAppointment = async (req, res, next) => {
  try {
    const { chiefComplaint, symptom, appointmentDate, status, DoctorId } =
      req.body;
    const PatientId = +req.user.id;
    const appointment = await Appointment.create({
      chiefComplaint,
      symptom,
      appointmentDate,
      status,
      DoctorId,
      PatientId,
    });
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};
const getAllSymptom = async (req, res, next) => {
  try {
    const { data } = await axios({
      method: "get",
      url: "https://sandbox-healthservice.priaid.ch/symptoms",
      params: {
        token: API_MEDIC_KEY,
        language: "en-gb",
      },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const createConsultReport = async (req, res, next) => {
  try {
    const AppointmentId = +req.params.appointmentId;
    const { diagnosis, needSurgicalAction, needMedicalDrug, cost } = req.body;
    const consultReport = await ConsultationReport.create({
      diagnosis,
      needSurgicalAction,
      needMedicalDrug,
      cost,
      AppointmentId,
    });
    res.status(201).json(consultReport);
  } catch (error) {
    next(error);
  }
};
const getAllPatientAppointment = async (req, res, next) => {
  try {
    const id = +req.user.id;
    const appointments = await Appointment.findAll({
      where: { PatientId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: ConsultationReport,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
const getAllDoctorAppointment = async (req, res, next) => {
  try {
    const id = +req.user.id;
    const appointments = await Appointment.findAll({
      where: { DoctorId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createAppointment,
  getAllSymptom,
  createConsultReport,
  getAllPatientAppointment,
  getAllDoctorAppointment,
};
