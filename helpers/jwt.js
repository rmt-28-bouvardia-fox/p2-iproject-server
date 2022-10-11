const jwt = require('jsonwebtoken');
const secret = process.env.jwt_secret

function createToken(payload){ // membuat payload menjadi token
    return jwt.sign(payload, secret)
}

function verifyToken(token){ // decode token menjadi payload
    return jwt.verify(token, secret)
}

module.exports = { createToken, verifyToken}