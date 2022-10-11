const bcrypt = require("bcryptjs")

function hash(password){
    const hash = bcrypt.hashSync(password, 10)
    return hash
}

function compare(password, hashed){
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    hash,
    compare
}