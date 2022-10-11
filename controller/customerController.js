const { User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const axios = require("axios");

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
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
