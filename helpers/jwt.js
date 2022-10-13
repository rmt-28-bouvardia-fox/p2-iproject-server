const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

const generateTokenFromPayload = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const readPayloadFromToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateTokenFromPayload, readPayloadFromToken };
