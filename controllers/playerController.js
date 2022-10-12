const getPlayers = require('../helpers/getData')
const { Player, MyPlayer } = require('../models')
const PlayerM = require('../models/playerMongoDB')

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

    static async showMongoPlayers(req, res, next) {
        try {
            const players = await PlayerM.find()
            res.status(200).json(players)
        } catch (error) {
            console.log(error);
        }
    }

    static async addPlayersToMongo(req, res, next) {
        try {
            const madridId = 541
            const manUId = 33
            const manCityId = 50
            const psgId = 85
            const teams = [madridId, manUId, manCityId, psgId]
            const madridPlayers = await getPlayers(madridId)
            const manUPlayers = await getPlayers(manUId)
            const manCityPlayers = await getPlayers(manCityId)
            const psgPlayers = await getPlayers(psgId)
            await PlayerM.insertMany(madridPlayers)
            await PlayerM.insertMany(manUPlayers)
            await PlayerM.insertMany(manCityPlayers)
            await PlayerM.insertMany(psgPlayers)
            res.status(201).json({message: 'Berhasil menambahkan players'})
        } catch (error) {
            res.status(500).json('Internal Server Error')
        }
    }
}

module.exports = Controller