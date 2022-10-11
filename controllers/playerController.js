const { Player, MyPlayer } = require('../models')

class Controller{
    static async showAllPlayers(req, res, next) {
        try {
            const players = await Player.findAll()
            res.status(200).json(players)
        } catch (error) {
            next(error)
        }
    }

    static async showMyPlayers(req, res, next) {
        try {
            const { TeamId } = req.user
            const myPlayer = await MyPlayer.findAll({
                include: {
                    model: Player,
                    as: 'Player'
                },
                where: { TeamId }
            })
            res.status(200).json(myPlayer)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller