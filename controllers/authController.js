const {User} = require('../models')
class Controller {

    static async register(req,res,next){
        try {
            const {username,email,password} = req.body
            const user = User.create({
                username,
                email,
                password
            })
            res.status(201).json({message : `user id ${user.id} with ${user.email} has been created`})
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            
        } catch (err) {
            
        }
    }

    static async google(req,res,next){
        try {
            
        } catch (err) {
            
        }
    }

    static async facebook(req,res,next){
        try {
            
        } catch (err) {
            
        }
    }

}

module.exports = Controller