const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "rahasia";

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: "bidder",
      });
      res
        .status(201)
        .json({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        });
    } catch (error) {
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        res.status(401).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "invalid_login" };
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        throw { name: "invalid_login" };
      }

      const payload = {
        id: user.id,
        role: user.role,
      };
      const access_token = jwt.sign(payload, SECRET);
      res
        .status(200)
        .json({
          access_token: access_token,
          email: user.email,
          username: user.username,
          id: user.id,
        });
    } catch (error) {
      if (error.name == "invalid_login") {
        res.status(400).json({ message: "invalid email/password" });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }
}

module.exports = UserController;
