const { User } = require("../models");

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
      res.status(201).json({id: newUser.id, username: newUser.username, email: newUser.email});
    } catch (error) {
      if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError") {
        res.status(401).json({message: error.errors[0].message})
      } else {
        res.status(500).json({message: "internal server error"})
      }
    }
  }
}

module.exports = UserController;
