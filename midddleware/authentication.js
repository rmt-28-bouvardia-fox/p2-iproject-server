
const { verifyJWT } = require('../helpers/jwt')
const { User, Team } = require('../models')
const authentication = async (req, res, next) => {
    try {
        const access_token = req.headers.access_token
        if (!access_token) {
            throw { name: "invalid_token" }
        }
        const payload = verifyJWT(access_token)
        const user = await User.findOne({ where: { id: payload.id } })
        if (!user) {
            throw { name: "invalid_token" }
        }
        req.user = { id: user.id, name: user.name }
        next();
    } catch (error) {
        if (error.name === "invalid_token" || error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "invalid token" })
        } else {
            res.status(500).json("ISE")
        }
    }
}

module.exports = authentication