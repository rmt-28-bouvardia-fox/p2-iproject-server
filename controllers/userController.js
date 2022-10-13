const {User} = require('../models/index')
const bcryptjs = require('bcryptjs')
const {createToken} = require('../helpers/jwt')

class UserController {
    static async register(req,res, next){
        try{
            const { username,password,email } = req.body
            const data = await User.create({username,password,email})
            res.status(201).json({id: data.id, username: data.username})
        }catch(err){
            next(err)
        }
    }
    static async login(req,res,next){
        try{
            const { email, password} = req.body 
            const data = await User.findOne({where: {email}})
            if(!data){
                throw {name: 'Email/password is incorrect !'}
            }
            const verify = bcryptjs.compareSync(password, data.password)
            if (!verify){
                throw {name: 'Email/password is incorrect !'}
            }
            const payload = {
                id: data.id,
                username: data.username
            }
            const access_token = createToken(payload)
            res.status(200).json({access_token})
        }catch(err){
            next(err)
        }
    }
}

module.exports = UserController