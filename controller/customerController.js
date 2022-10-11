const { User } = require("../models");

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
}

module.exports = Controller;
