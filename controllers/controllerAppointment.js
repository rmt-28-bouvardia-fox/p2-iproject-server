const {
  Doctor,
  Patient,
  PatientDetail,
  Appointment,
  ConsultationReport,
} = require("../models");
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
      url: "https://healthservice.priaid.ch/symptoms",
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
const getAllSpecialist = async (req, res, next) => {
  try {
    const email = req.user.email;
    const patient = await Patient.findOne({
      where: { email },
      include: PatientDetail,
    });
    if (!patient) {
      throw { name: "data_not_found" };
    }
    const gender = patient.PatientDetail.gender.toLowerCase();
    const year_of_birth = patient.PatientDetail.birthDate.getFullYear();
    const { symptoms } = req.query;
    const { data } = await axios({
      method: "get",
      url: "https://healthservice.priaid.ch/diagnosis/specialisations",
      params: {
        token: API_MEDIC_KEY,
        symptoms,
        gender,
        year_of_birth,
        language: "en-gb",
      },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const getDiagnosis = async (req, res, next) => {
  try {
    const { appointmentId } = req.query;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    const patientId = appointment.PatientId;
    const symptoms = `[${appointment.symptom}]`;
    const patient = await Patient.findOne({
      where: { id: patientId },
      include: PatientDetail,
    });
    if (!patient) {
      throw { name: "data_not_found" };
    }
    const gender = patient.PatientDetail.gender.toLowerCase();
    const year_of_birth = patient.PatientDetail.birthDate.getFullYear();
    const { data } = await axios({
      method: "get",
      url: "https://healthservice.priaid.ch/diagnosis",
      params: {
        token: API_MEDIC_KEY,
        symptoms,
        gender,
        year_of_birth,
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
    await ConsultationReport.create({
      diagnosis,
      needSurgicalAction,
      needMedicalDrug,
      cost,
      AppointmentId,
    });
    await Appointment.update(
      { status: "Complete" },
      { where: { id: AppointmentId } }
    );
    res.status(201).json({
      message: "Consultation report created, appointment status updated",
    });
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
      include: [
        {
          model: ConsultationReport,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Doctor,
          attributes: ["name"],
        },
      ],
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
      include: {
        model: Patient,
        attributes: ["id"],
        include: {
          model: PatientDetail,
          attributes: ["name"],
        },
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const appointmentId = +req.params.appointmentId;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      throw { name: "data_not_found" };
    }
    await Appointment.update(
      { status: "Archived" },
      { where: { id: appointmentId } }
    );
    res.status(200).json({ message: "Status appointment have been updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  createAppointment,
  getAllSymptom,
  getAllSpecialist,
  getDiagnosis,
  createConsultReport,
  getAllPatientAppointment,
  getAllDoctorAppointment,
  updateStatus,
};
