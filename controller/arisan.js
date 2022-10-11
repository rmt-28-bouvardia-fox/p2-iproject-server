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
}