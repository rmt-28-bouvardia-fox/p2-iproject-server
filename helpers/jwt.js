const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { createToken, verifyToken };
