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
    
   

    static async formattion(req, res, next) {
        try {
            // const UserId
        } catch (error) {
            next(error)
        }
    }



    // static async profile(req, res, next) {
    //     try {
    //         const UserId = req.user.id
    //         const option = {}
    //         option.where = { UserId }
    //         const team = await Team.findOne(option)
    //         if (!team) {
    //             throw { name: 'invalid_credentials' }
    //         }
    //         const avgRating = await Team.findOne({
    //             where: { id: team.id },
    //             attributes: [[sequelize.fn('AVG', sequelize.col('Players.rating')), 'value']],
    //             include: {
    //                 model: Player, attributes: []
    //             },
    //             group: ['Team.id']
    //         })
    //         const overallRating = avgRating.dataValues.value
    //         res.status(200).json({ team, overallRating })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}

module.exports = TeamController