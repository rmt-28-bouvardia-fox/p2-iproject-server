const jwt = require('jsonwebtoken')
const secret = process.env.secret_api

const createToken = (payload) => jwt.sign(payload,secret)

const verifyToken = (token) => jwt.verify(token,secret)

module.exports = {
    createToken,
    verifyToken
}