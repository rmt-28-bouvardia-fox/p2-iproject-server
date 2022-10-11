const jwt = require('jsonwebtoken')

function signToken(payload) {
  const SECRET = process.env.JWT_SECRET
  return jwt.sign(payload, SECRET)
}

function verifyToken(token) {
  const SECRET = process.env.JWT_SECRET
  return jwt.verify(token, SECRET)
}

module.exports = { signToken, verifyToken }
