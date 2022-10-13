const { User, Wishlist, Order } = require("../models");
const { createToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const axios = require("axios");
const nodemailer = require("nodemailer");
const midtransClient = require("midtrans-client");
const order = require("../models/order");

class Controller {
  static async customerRegister(req, res, next) {
    try {
      const { username, email, password, steamUrl } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        steamUrl,
      });
      res.status(201).json({ message: `${newUser.id}, ${newUser.email}` });
    } catch (error) {
      next(error);
    }
  }

  static async customerLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "body_missing",
          status: 400,
          message: "Email is required",
        };
      }
      if (!password) {
        throw {
          name: "body_missing",
          status: 400,
          message: "Password is required",
        };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: `invalid_credentials` };
      }
      const passValid = compare(password, user.password);

      if (!passValid) {
        throw { name: `invalid_credentials` };
      }
      //sign
      const payload = {
        id: user.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async gameCustomer(req, res, next) {
    try {
      const { title } = req.query;
      const { data } = await axios({
        method: "get",
        url: `https://www.cheapshark.com/api/1.0/games?title=${title}`,
      });
      const result = [];
      data.forEach((el) => {
        if (el.steamAppID) {
          result.push(el);
        }
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addWishlist(req, res, next) {
    try {
      const { dataGame } = req.body;
      await Wishlist.create({ UserId: req.user.id, dataGame });
      res.status(201).json({ message: "sukses add wishlist" });
    } catch (error) {
      next(error);
    }
  }

  static async fetchWishlist(req, res, next) {
    try {
      const findWishlist = await Wishlist.findAll({
        where: { UserId: req.user.id },
      });
      res.status(200).json(findWishlist);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      let id = req.params.id;
      const findWish = await Wishlist.findOne({ where: { id } });
      if (!findWish) {
        throw { name: "data not found" };
      }
      await Wishlist.destroy({
        where: { id },
      });
      res.status(200).json({ message: `success remove wishlist` });
    } catch (error) {
      next(error);
    }
  }

  static async fethcOneWishlist(req, res, next) {
    try {
      let id = req.params.id;
      const data = await Wishlist.findOne({ where: { id } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async buyGame(req, res, next) {
    try {
      let price = req.params.price;
      const { email, title } = req.body;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-4SbP9885175rZWTHMq1UcYPu",
      });

      let parameter = {
        transaction_details: {
          order_id: new Date(),
          gross_amount: price,
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
        res.status(200).json({ transactionToken });
      });

      // NODEMAILER
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.ID_GMAIL,
      //     pass: process.env.PASS_GMAIL,
      //   },
      // });
      // console.log(process.env.ID_GMAIL);
      // console.log(process.env.PASS_GMAIL);
      // const mailOptions = {
      //   from: process.env.ID_GMAIL,
      //   to: email,
      //   subject: "mail from gift game",
      //   text: `terima kasih sudah membeli gamenya ${title} seharga ${price}`,
      // };
      // transporter.sendMail(mailOptions, (err, info) => {
      //   if (err) {
      //     console.log(err, "masuk ke error");
      //   }
      //   console.log("Email sent: " + info.response);
      // });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addOrder(req, res, next) {
    try {
      const { title, price, imageUrl } = req.body;
      let UserId = req.user.id;
      const data = await Order.create({ title, price, imageUrl, UserId });
      res.status(201).json({ message: `sukses order` });
    } catch (error) {
      next(error);
    }
  }

  static async fetchOrder(req, res, next) {
    try {
      const data = await Order.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
