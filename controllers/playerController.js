const { Player } = require('../models')

class Controller{
    static async showAllPlayers(req, res, next) {
        try {
            const players = await Player.findAll()
            res.status(200).json(players)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller