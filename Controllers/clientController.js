const {User} = require('../models')

class ClientController {

    static async register(req,res,next){
        try {
            const {username, email, password, firstName, lastName, phoneNumber, address} = req.body

            const user = await User.create({username, email, password, firstName, lastName, phoneNumber, address})

            res.status(200).json({id : user.id, email : user.email})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ClientController