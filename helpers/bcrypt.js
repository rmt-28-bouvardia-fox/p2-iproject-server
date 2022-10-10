const bcrypt = require('bcryptjs')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}
module.exports = { hashPassword, comparePassword }