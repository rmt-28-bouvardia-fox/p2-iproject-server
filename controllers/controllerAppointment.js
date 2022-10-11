const { Appointment, ConsultationReport } = require("../models");

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
module.exports = { createAppointment, createConsultReport };
