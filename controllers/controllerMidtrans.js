const midtransClient = require("midtrans-client");
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const { Patient, PatientDetail, Appointment } = require("../models");
const midtransHandler = async (req, res, next) => {
  try {
    const { appointmentId, cost } = req.query;
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
      include: {
        model: Patient,
        attributes: ["email"],
        include: {
          model: PatientDetail,
          attributes: ["name"],
        },
      },
    });

    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: `APPOINTMENT-123${appointment.id}`,
        gross_amount: +cost,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: appointment.Patient.PatientDetail.name,
        last_name: "",
        email: appointment.Patient.email,
        phone: "0812345678",
      },
    };
    const transaction = await snap.createTransaction(parameter);

    //transaction token
    let transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);
    res.status(200).json({ transactionToken });
  } catch (error) {
    next(error);
  }
};
module.exports = { midtransHandler };
