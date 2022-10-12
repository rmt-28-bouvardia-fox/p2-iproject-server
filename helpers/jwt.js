const jwt = require('jsonwebtoken')
const topSecret = process.env.JWT_SECRET

function getToken(payload) {
    return jwt.sign(payload, topSecret)
}

function verifyJWT(token) {
    return jwt.verify(token, topSecret)
}

module.exports = { getToken, verifyJWT }