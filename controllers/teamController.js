const { Team, User, Player, MyPlayer } = require('../models')
const PlayerM = require('../models/playerMongoDB')

class TeamController {
    static async createTeam(req, res, next) {
        try {
            const { name, logo } = req.body
            const UserId = req.user.id
            const team = await Team.create({ name, logo, UserId })
            res.status(201).json(team)
        } catch (error) {
            next(error)
        }
    }

    static async teamProfile(req, res, next) {
        try {
            const UserId = req.user.id
            const option = {}

            const team = await Team.findOne({
                include: {
                    model: Player,
                    as: 'Players'
                },
                where: { UserId }
            })
            if (!team) {
                throw { name: 'invalid_credentials' }
            }
            res.status(200).json(team)
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = TeamController