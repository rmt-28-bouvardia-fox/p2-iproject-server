const { Product, User, UserProduct } = require("../models");
const nodemailer = require("nodemailer");
const midtransClient = require('midtrans-client');
const axios = require("axios");

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll({
        include: ["OwnerProduct"],
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const id = +req.params.id;
      const product = await Product.findOne({
        where: { id },
        include: ["OwnerProduct", "BidderProduct"],
      });
      if (product === null) {
        throw { name: "invalid" };
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }

  static async startBid(req, res, next) {
    try {
      const userId = req.user.id;
      const productId = +req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        throw { name: "invalid" };
      }
      const bidded = await Product.update(
        {
          price: product.price + 2000,
          BidderId: userId,
        },
        { where: { id: productId } }
      );
      res.status(200).json({
        message: `new bid by ${req.user.username} on ${product.name}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async mailer(req, res, next) {
    try {
      // console.log(req.user.email)
      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "ban.ceban@hotmail.com",
          pass: process.env.GMAIL_PASS,
        },
      });
      const mailOptions = {
        from: "ban.ceban@hotmail.com",
        to: req.user.email,
        subject: "Happy Bidding",
        text: "Your bid has been updated!, you're the first in line!",
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log("Email sent: " + info.response);
      });
      res
        .status(200)
        .json({ message: "notification has been send to your email" });
    } catch (error) {
      next(error);
    }
  }

  static async newList(req, res, next) {
    try {
      const productId = +req.params.productId;
      const userId = req.user.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        throw { name: "invalid" };
      }
      const userProduct = await UserProduct.create({
        UserId: userId,
        ProductId: productId,
      });
      res.status(201).json(userProduct);
    } catch (error) {
      next(error);
    }
  }

  static async pay(req, res, next) {
    const { gross_amount } = req.body
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: "SB-Mid-server-r_Xh_HnIqTRH_2W-hnOn-_L4",
    });

    let parameter = {
      transaction_details: {
        order_id: new Date(),
        gross_amount: gross_amount,
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
  }

  static async getAllList(req, res, next) {
    try {
      console.log(+req.user.id);
      const lists = await UserProduct.findAll({
        where: { UserId: +req.user.id },
        include: [
          { model: Product, include: ["BidderProduct", "OwnerProduct"] },
        ],
      });
      res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }

  static async deleteList(req, res, next) {
    try {
      const id = req.params.listId;
      const list = await UserProduct.findByPk(id);
      if (!list) {
        throw { name: "invalid" };
      }
      const listId = +req.params.listId;
      const deletedList = await UserProduct.destroy({ where: { id: listId } });
      res.status(200).json({ message: `${list.id} succseed to deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async mainComodity(req, res, next) {
    try {
      const {search} = req.query
      const { data } = await axios({
        method: 'get',
        url: "https://jibs.my.id/api/harga_komoditas"
      })
      res.status(200).json(data.national_commodity_price[search])
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController;
