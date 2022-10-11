"use strict";

const { compareHash } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password,
      });
      res
        .status(201)
        .json({ message: `Welcome and Have Fun ${user.username} !` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
