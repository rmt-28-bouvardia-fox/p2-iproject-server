const {User} = require('./../models');

class Controller {
    static async register(req,res, next){
        try {
            const { username, email, password } = req.body
            const createUser = await User.create ({username, email, password})
            res.status(201).json({message: `id:${createUser.id}, email:${createUser.email}`})
        } 
        catch (error) {
            next(error)
        }
    }
}
module.exports = Controller