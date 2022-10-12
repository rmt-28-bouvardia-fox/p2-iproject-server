const Opponent  = require('../models/opponent')
const { Team, Player, sequelize } = require('../models')
const calculateScore = require('../helpers/calculateScore')

class Controller {
    static async showAllOpponents (req, res, next) {
        try {
            const opponents = await Opponent.find()
            res.status(200).json(opponents)
        } catch (error) {
            next(error)
        }
    }

    static async playWithOpponents(req, res, next) {
        try {
            const {TeamId}  = req.user            
            const { id } = req.params
            const teamFound = await Team.findOne({ where: { id: TeamId }, include: Player })
            if (teamFound.Players.length < 11) {
                throw{name: 'bad_request', err: `You must have minimum 11 players for a match`}
            }
            const team = await Team.findOne({
                where: { id: TeamId },
                attributes: [
                    'name', 'logo',
                    [sequelize.fn('avg', sequelize.col('Players.rating')), 'rating']
                ],
                include: {
                    model: Player,
                    attributes: []
                },
                group: ['Team.id'] })
            const ratingT = Number(Number(team.dataValues.rating).toFixed(2))
            const opponent = await Opponent.findOne({
                _id: id
            })
            const ratingO = opponent.rating
            let message = `Unfortunately, your team lose to ${opponent.name}!`
            const match = calculateScore(ratingT, ratingO)
            if (match.result == 'win') {
                Team.increment({ money: 3000 }, { where: { id: TeamId } })
                message = 'Congratulation! Your team wins the match. Reward: $ 3000!'
            } else if (match.result == 'tie') {
                message = `The result is draw!`
            }
            res.status(200).json({message, score: match.score})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller