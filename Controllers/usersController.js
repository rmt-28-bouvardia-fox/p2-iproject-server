const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.create({ email, password });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "invalid_email" };
      }
      if (!password) {
        throw { name: "invalid_password" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "invalid_credential" };
      }

      const validPassword = comparePassword(password, user.password);

      if (!validPassword) {
        throw { name: "invalid_credential" };
      }

      const payload = {
        id: user.id,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
