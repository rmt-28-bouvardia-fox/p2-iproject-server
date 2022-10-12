const { User, Team } = require('../models')

const generateTeam = async (req, res, next) => {
    try {
        const UserId = req.user.id
        const team = await Team.findOne({ where: { UserId } })
        if (!team) {
            throw{name:'invalid_credentials'}
        }
        req.user.TeamId = team.id
        next();
    } catch (error) {
        res.status(500).json("ISE")
    }
}

module.exports = generateTeam