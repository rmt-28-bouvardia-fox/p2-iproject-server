"use strict";

const { compareHash } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const axios = require("axios");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw { name: "invalid_credential" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "invalid_credential" };
      }
      const validatePassword = compareHash(password, user.password);

      if (!validatePassword) {
        throw { name: "invalid_credential" };
      }

      const payload = {
        id: user.id,
      };
      const access_token = generateToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async authentication(req, res, next) {
    try {
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: "invalid_token" };
      }

      const payload = verifyToken(access_token);

      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: "invalid_token" };
      }

      const username = user.username;
      const id = user.id;
      res.status(200).json({ access_token, username, id });
    } catch (error) {
      next(error);
    }
  }

  static async githubSignIn(req, res, next) {
    try {
      const { githubToken } = req.body;

      if (!githubToken) {
        throw { name: "invalid_credential" };
      }

      const dataGithub = await axios({
        method: "get",
        url: "https://api.github.com/user",
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      });

      const userUsername = dataGithub.data.login;

      const [user, created] = await User.findOrCreate({
        where: { username: userUsername },
        defaults: {
          username: userUsername,
          email: `${userUsername}@github.com`,
          password: "github",
        },
        hooks: false,
      });

      const access_token = generateToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async simsimi(req, res, next) {
    try {
      const { message } = req.body;
      const result = await axios({
        method: "post",
        url: "https://wsapi.simsimi.com/190410/talk",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "iqR7cNRA._VIrMU_D_eoVIeih1uUiEhUpra.G43y",
        },
        data: {
          utext: message,
          lang: "en",
          atext_bad_prob_max: 0.7,
        },
      });

      res.status(200).json({ message: result.data.atext });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
