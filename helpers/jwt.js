const jwt = require('jsonwebtoken')
const key = 'This is a secret ssst'

const createToken = (payload) => jwt.sign(payload, key);
const decodeToken = (token) => jwt.verify(token, key);

module.exports = { createToken, decodeToken }