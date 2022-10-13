const axios = require("axios");
const { News, User } = require("../models");
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");

class NewsController {
  static async getTopHeadlinesNews(req, res, next) {
    try {
      const { country, category } = req.query;

      const { data } = await axios({
        method: "get",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country,
          apiKey: process.env.NEWS_SECRET,
          category,
        },
      });

      await res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async midtrans(req, res, next) {
    // Create Snap API instance
    const user = await User.findByPk(req.user.id);
    const { orderId } = req.query;

    if (!user) {
      throw { name: "invalid_token" };
    }

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: 100000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: user.email,
        phone: "08111222333",
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      res.status(200).json({ transactionToken });
    });
  }

  static async updateStatus(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        throw { name: "invalid_token" };
      }

      await User.update(
        { status: "subscriber" },
        { where: { id: req.user.id } }
      );

      res.status(200).json({ message: "Success become our subscriber" });
    } catch (error) {
      next(error);
    }
  }

  static async sendEmail(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        throw { name: "invalid_credential" };
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "ally.durgan52@ethereal.email",
          pass: "EjcdNG3jxuBZBXFXEs",
        },
      });

      let info = await transporter.sendMail({
        from: '"The Hacktiv Times" <hacktivtimes@mail.com>',
        to: `${user.email}`,
        subject: "Hacktiv Times Subscription",
        text: "Thank you for subscribe our letter",
      });

      res.status(200).json({ message: nodemailer.getTestMessageUrl(info) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;
