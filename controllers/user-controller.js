const { verifyHashWithPlaintext } = require("../helpers/bcrypt");
const { generateTokenFromPayload } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({ username,email, password });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Unauthorized" };
      }

      const isMatchPassword = verifyHashWithPlaintext(password, user.password);

      if (!isMatchPassword) {
        throw { name: "Unauthorized" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        accountStatus: user.accountStatus
      };

      const token = generateTokenFromPayload(payload);

      res.status(200).json({ access_token: token, accountStatus:user.accountStatus, username:user.username });
    } catch (err) {
      next(err);
    }
  }
}

module.exports=UserController