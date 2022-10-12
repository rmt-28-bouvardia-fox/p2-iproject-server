const calculatePrice = require('../helpers/playerPrice')
const { Player, Team } = require('../models')
const PlayerM = require('../models/playerMongoDB')

class Controller{

    static async findPlayer(req, res, next) {
        try {
            const {id} = req.params
            const player = await PlayerM.find({
                _id: id
            })
            res.status(200).json(player)
        } catch (error) {
            res.status(500).json('Internal server error')
        }
    }

    static async buyPlayer(req, res, next) {
        try {
            const PlayerId = req.params.id
            const { TeamId } = req.user
            const playerDB = await PlayerM.findOne({
                _id: PlayerId
            })

            if (!playerDB) {
                throw { name: 'no_credentials' }
            }
            const player = await Player.findOne({ where: { name: playerDB.name, TeamId, TeamId } })
            if (player) {
                throw { name: 'bad_request', err: `Your team already have ${player.name}!` }
            }
            const price = calculatePrice(playerDB.rating)
            const team = await Team.findOne({ where: { id: TeamId } })
            if (team.money < price) {
                throw { name: 'error_buy', err: `You don't have enough money!` }
            }
            const { name, rating, position, number, photo } = playerDB
            const newPlayer = await Player.create({ TeamId, name, rating, position, number, photo, price })
            await Team.decrement({ money: price }, { where: { id: TeamId } })
            res.status(201).json({ message: `Successful recruiting ${newPlayer.name} for ${team.name}` })
        } catch (error) {
            next(error)
        }
    }

    static async getRandomPlayer(req, res, next) {
        try {
            const players = await PlayerM.find()
            const { TeamId } = req.user
            const totalPlayers = players.length
            
            let randomNumber = Math.ceil(Math.random() * totalPlayers)
            let playerDB = await PlayerM.find()
            let gatchaPlayer = playerDB[randomNumber]
            const playerFound = await Player.findOne({ where: { name: gatchaPlayer.name, TeamId } })
            while (playerFound) {
                randomNumber = Math.ceil(Math.random() * totalPlayers)
                let gatchaPlayer = playerDB[randomNumber]
                playerFound = await Player.findOne({ where: { name: gatchaPlayer.name, TeamId } })
            }
            const { name, rating, position, number, photo } = gatchaPlayer
            const gatchaFee = 2000
            const team = await Team.findOne({ where: { id: TeamId } })
            if (team.money < gatchaFee) {
                throw { name: 'error_buy', err: `Your don't have enough money!` }
            }
            const price = calculatePrice(rating)
            await Player.create({ TeamId, name, rating, position, number, photo, price })
            Team.decrement({ money: gatchaFee }, { where: { id: TeamId } })
            res.status(201).json({ message: `Yeay, you got ${name}` })
        } catch (error) {
            next(error)
        }
    }

    static async showAllPlayers(req, res, next) {
        try {
            if (req.query.search) {
                search = req.query.search
            }
            const players = await PlayerM.find()
            
            res.status(200).json(players)
        } catch (error) {
            next(error)
        }
    }
    static async showStorePlayers(req, res, next) {
        try {
            let search = ''
            if (req.query.search) {
                search = req.query.search
            }
            let playersPerPage = null
            if (req.query.page) {
                playersPerPage = 12
            }
            const re = new RegExp(search)
            const { page } = req.query || 0
            const players = await PlayerM.find({
                name: re
            })
                .skip(page * playersPerPage)
                .limit(playersPerPage)
                .sort({name: 1})
            
            res.status(200).json(players)
        } catch (error) {
            next(error)
        }
    }
    static async showMyPlayers(req, res, next) {
        try {
            const { TeamId } = req.user
            const myPlayer = await Player.findAll({
                where: { TeamId }
            })
            res.status(200).json(myPlayer)
        } catch (error) {
            next(error)
        }
    }

    static async findMyPlayer(req, res, next) {
        try {
            const {id} = req.params
            const playerFound = await Player.findOne({
                where: { id }
            })
            if (!playerFound) {
                throw { name: 'invalid_credentials'}
            }
            res.status(200).json(playerFound)
        } catch (error) {
            next(error)
        }
    }

    static async sellPlayer(req, res, next) {
        try {
            const { id } = req.params
            const {TeamId} = req.user
            const playerFound = await Player.findOne({
                where: { id }
            })
            if (!playerFound) {
                throw { name: 'invalid_credentials' }
            }
            Player.destroy({where:{id}})
            let price = playerFound.price
            Team.increment({ money: price }, { where: { id: TeamId } })
            res.status(200).json({ message: `Successful selling ${playerFound.name} for $ ${price}` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller

// {
// _id: {
//     $gt: "634652cfb002d4c74258987e"
// }
//             }