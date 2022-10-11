const { User } = require("./../models");
const { compare } = require("./../helpers/bcrypt");
const { createToken } = require("./../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const createUser = await User.create({ username, email, password });
      res
        .status(201)
        .json({ message: `id:${createUser.id}, email:${createUser.email}` });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Required" };
      }
      if (!password) {
        throw { name: "Required" };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "Invalid Input" };
      }
      const checkPassword = compare(password, findUser.password);

      if (!checkPassword) {
        throw { name: "Invalid Input" };
      }

      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);

      res.status(200).json({ access_token, findUser });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
