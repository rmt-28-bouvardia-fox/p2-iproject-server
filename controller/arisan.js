const ms = require("ms");
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { Arisan, MyArisan, User, LogTran } = require("../models");
// let arisanId
class Controller {
  static async fetchArisan(req, res, next) {
    try {
      const result = await Arisan.findAll({
        where: {
          people: {
            [Op.lt]: 10,
          },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const find = await LogTran.findAll({
        where : {UserId : req.user.id, ArisanId : req.params.id }, include : [User, Arisan]
      })
      res.status(200).json(find)
    } catch (error) {
      next(error)
    }
  }
  static async fetchMyArisan(req, res, next) {
    try {
      const result = await MyArisan.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [Arisan],
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async addMyArisan(req, res, next) {
    try {
      const { longitude, latitude } = req.body;
      if (!longitude || !latitude) {
        throw { name: "Location Needed" };
      }
      const find = await MyArisan.findOne({
        where: { ArisanId: req.params.id, UserId: req.user.id },
      });
      if (find) {
        throw { name: "Arisan Already exists" };
      } else {
        const add = await MyArisan.create({
          UserId: +req.user.id,
          ArisanId: +req.params.id,
        });
        await Arisan.increment({ people: 1 }, { where: { id: req.params.id } });
        await LogTran.create({
          ArisanId: +req.params.id,
          UserId: +req.user.id,
        });
        // console.log(made)
        await User.update(
          { longtitude : longitude, latitude },
          {
            where: {
              id: req.user.id,
            },
          }
        );
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        const email = await User.findByPk(req.user.id);
        const options = {
          from: process.env.USER_EMAIL,
          to: email.email,
          subject: "Tagihan Arisan",
          text:
            "Tagihan hari ini adalah \n" +
            `Segera Bayar Tagihan Anda, harap tidak terlambat \n hehe.`,
        };
        transporter.sendMail(options, (err, info) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log("Sent email : " + info.response);
          }
        });
        res.status(201).json({ id: add.id, User: add.UserId });
      }
    } catch (error) {
      error.id = req.params.id;
      next(error);
    }
  }
  static async fetchLogTransaction(req, res, next) {
    try {
      const result = await LogTran.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [Arisan,User],
      });
      // console.log(result)
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async addArisan(req, res, next) {
    try {
      const { name, expiredAt } = req.body;
      if (expiredAt === "1y") {
        const createArisan = await Arisan.create({
          name,
          expiredAt: new Date().getTime() + ms("10y"),
        });
        res
          .status(201)
          .json({ message: `Created arisan with id : ${createArisan.id}` });
      } else if (expiredAt === "1m") {
        const createArisan = await Arisan.create({
          name,
          expiredAt: new Date().getTime()+ms("300d"),
        });
        res
          .status(201)
          .json({ message: `Created arisan with id : ${createArisan.id}` });
      } else {
        throw { name: "Insert the correct value /1 Year or /1 Month" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async payTrans(req, res, next) {
    try {
      const result = await LogTran.findByPk(req.params.id);
      if (!result) {
        throw { name: "Log Transaction not found" };
      }
      if (result.status == "Success") {
        throw { name: "The bill has been paid" };
      }
      await LogTran.update(
        { status: "Success" },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const { longitude, latitude } = req.body;
      await User.update(
        { longtitude : longitude, latitude },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      await LogTran.create({
        ArisanId: +req.params.id,
        UserId: +req.user.id,
      });
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const email = await User.findByPk(req.user.id);
      const options = {
        from: process.env.USER_EMAIL,
        to: email.email,
        subject: "Tagihan Arisan",
        text:
          "Tagihan hari ini adalah \n" +
          `https://link.dana.id/minta/2r5xsk35jr6`,
      };

      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("Sent email : " + info.response);
        }
      });
      res
        .status(200)
        .json({ message: "Updated status transaction into Success" });
    } catch (error) {
      next(error);
    }
  }
  static async midtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: "SB-Mid-server-qjWt8PBvtX45mmB4ztQBs9bq",
    });
    let parameter = {
      transaction_details: {
        order_id: `${Math.floor(Math.random()*100) + 1}`,
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "budi",
        last_name: "pratama",
        email: "budi.pra@example.com",
        phone: "08111222333",
      },
    };
    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);
      res.status(200).json(transactionToken)
    });
    } catch (error) {
      next(error)
    }
    
  }
}




module.exports = Controller;