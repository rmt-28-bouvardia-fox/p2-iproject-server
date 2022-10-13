const jwt = require("jsonwebtoken");
const { User } = require(`../models`);
const SECRET = "rahasia";

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalid_token" };
    }
    const payload = jwt.verify(access_token, SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalid_token" };
    }

    req.user = {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
