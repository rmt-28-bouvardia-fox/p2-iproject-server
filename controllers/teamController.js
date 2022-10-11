const { Team, User, Player, MyPlayer } = require('../models')

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
    
    static async buyPlayer(req, res, next) {
        try {
            const PlayerId = req.params.playerId
            const {TeamId} = req.user
            const player = await Player.findOne({ where: { id: PlayerId } })
            if (!player) {
                throw{name: 'no_credentials'}
            }

            const myPlayer = await MyPlayer.findOne({ where: { PlayerId: player.id, TeamId } })
            if (myPlayer) {
                throw{name: 'bad_request', err: `Your team already have ${player.name}!`}
            }
            let price = 0
            if (player.rating >= 8) {
                price = 3000
            } else if (player.rating >= 7.5) {
                price = 2500
            } else if (player.rating >= 7) {
                price = 2000
            } else if (player.rating >= 6.5) {
                price = 1500
            } else if (player.rating >= 6) {
                price = 1000
            } else {
                price = 500
            }      
            const team = await Team.findOne({where: {id: TeamId}})
            if (team.money < price) {
                throw { name: 'error_buy' }
            }
            await MyPlayer.create({ TeamId, PlayerId: player.id })
            await Team.decrement({ money: price }, { where: { id: TeamId } })           
            res.status(201).json({ message: `Success buy ${player.name} for ${team.name}`})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getRandomPlayer(req, res, next) {
        try {
            const players = await Player.findAll()
            const {TeamId} = req.user
            const totalPlayers = players.length
            let randomNumber = Math.ceil(Math.random() * totalPlayers)
            let myPlayerFound = await MyPlayer.findOne({ where: { PlayerId: randomNumber, TeamId } })
            while (myPlayerFound) {
                randomNumber = Math.ceil(Math.random() * totalPlayers)
                myPlayerFound = await MyPlayer.findOne({ where: { PlayerId: randomNumber, TeamId  } })
            }
            const player = await Player.findOne({where: {id: randomNumber}})
            const price = 1000
            const team = await Team.findOne({where: {id:TeamId}})
            if (team.money < price) {
                throw { name: 'error_buy', err: `Your don't have enough money!` }
            }
            await MyPlayer.create({ TeamId, PlayerId: randomNumber })
            Team.decrement({ money: price }, { where: { id: TeamId } })
            res.status(201).json({ message: `Success recruit ${ player.name } for ${team.name}` })
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