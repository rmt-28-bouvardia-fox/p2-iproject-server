const jwt = require('jsonwebtoken')
const topSecret = 'rahasia'

function getToken(payload) {
    return jwt.sign(payload, topSecret)
}

function verifyJWT(token) {
    return jwt.verify(token, topSecret)
}

module.exports = { getToken, verifyJWT }