const jwt = require("jsonwebtoken");
const SECRET = "rahasia";

const signToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const verifyToken = (payload) => {
  return jwt.verify(payload, SECRET);
};

module.exports = { signToken, verifyToken };
