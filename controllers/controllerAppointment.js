const { Appointment } = require("../models");

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
      PatientId
    });
    res.status(201).json(appointment)
  } catch (error) {
    next(error);
  }
};

module.exports = { createAppointment };
