const { Op } = require("sequelize")
const { Arisan, MyArisan, User, LogTrans } = require("../models")

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
    static async addMyArisan(req, res, next) {
        try {
            const add = await MyArisan.create({
                UserId : req.user.id,
                ArisanId : req.params.id
            })
            res.status(201).json({id : add.id, User : add.UserId})
        } catch (error) {
            next(error)
        }
    }
    static async fetchLogTransaction(req, res, next) {
        try {
            const result = LogTrans.findAll({
                where : {
                    UserId : req.user.id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }   
}