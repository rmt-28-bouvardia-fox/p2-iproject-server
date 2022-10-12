const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {sign} = require('../helpers/jwt')

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

    static async login(req,res,next){
        try {
            const {email, password} = req.body
            if (!email){
                throw {name : `invalid_input_email`}
            }
            if (!password){
                throw {name : `invalid_input_password`}
            }
            const user = await User.findOne({where : {email}})

            if(!user){
                throw {name : `invalid_credentials`}
            }

            const isValid = compare(password, user.password)

            if(!isValid){
                throw {name : `invalid_credentials`}
            }

            const payload = {
                id : user.id,
                username : user.username
            }

            const access_token = sign(payload)

            res.status(200).json({access_token, username : user.username})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ClientController