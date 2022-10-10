const { compare } = require("../helpers/bcrypt")
const { sign } = require("../helpers/jwt")
const { User } = require("../models")

class UserController {
    static async LoginUser(req, res, next) {
        try {
            const {email , password} = req.body
            const user = await User.findOne({
                where : {
                    email
                }
            })

            if(!user){
                throw {name : "Invalid email/password"}
            }
            const passwordValid = compare(password, user.password)
            if(!passwordValid) {
                throw { name : "Invalid password"}
            }
            const payload = {
                id: user.id,
            }
            const access_token = sign(payload)
            res.status(200).json({access_token, id: user.id})
        } catch (error) {
            if (error.name == "Invalid email/password") {
                 res.status(400).json({ Access_token: "Invalid email/password" });
              } else if( error.name == "Invalid password") {
                res.status(400).json({ Access_token: "Invalid email/password" });
              } else {
                next()
              }
        }
    }
}

module.exports = UserController