const { Op } = require("sequelize")
const { Arisan, MyArisan, User } = require("../models")

class Controller {
    static async fetchArisan(req, res, next) {
        try {
            const result = await Arisan.findAll({
                where : {
                    people : {
                        [Op.lt] : 10
                    }
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async fetchMyArisan(req, res, next) {
        try {
            const result = await MyArisan.findAll({
                where: {
                    UserId : req.user.id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}