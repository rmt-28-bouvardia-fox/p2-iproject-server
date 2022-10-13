const snap = require("../helpers/midtrans");
const { User } = require("../models");
const nodemailer = require("nodemailer");
const emailTemplate = require("../helpers/emailFormat");

class PaymentController {
  static async postPayment(req, res, next) {
    try {
      const UserId = req.user.id
      const findAccount = await User.findByPk(UserId)

      let parameter = {
        transaction_details: {
          order_id: findAccount.orderId,
          gross_amount: findAccount.amount,
        },
        customer_details: {
          username: findAccount.username,
          email: findAccount.email,
        },
        enabled_payments: ["credit_card"],
        credit_card: {
          secure: true,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;
      let transactionRedirectUrl = transaction.redirect_url;
      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updatePaymentStatus(req, res, next) {
    try {
      const { orderId } = req.body;

      const payment = await User.findOne({
        where: {
          orderId,
        },
      });

      if (!payment) {
        throw { name: "NotFound" };
      }

      await payment.update(
        {
          paymentStatus: "success",
          accountStatus: "Premium"
        },
        {
          where: {
            orderId,
          },
        }
      );

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "uriel.lubowitz8@ethereal.email", // ethereal user
          pass: "DTd8AhjXEyUGngVbdH", // ethereal password
        },
      });

      const msg = {
        from: '"ShiraPort" <admin@shiraport.com>', // sender address
        to: `${payment.email}`, // list of receivers
        subject: "Thank you for your support!", // Subject line
        html: emailTemplate(payment.username), // html body
      };
      // send mail with defined transport object
      const info = await transporter.sendMail(msg);

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.status(200).json({
        message: "Payment status updated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;