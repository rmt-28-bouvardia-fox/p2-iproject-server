if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const { compare } = require("../helpers/bcrypt")
const { sign } = require("../helpers/jwt")
const { User } = require("../models")
const { OAuth2Client } = require("google-auth-library");
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
            res.status(200).json({access_token : access_token, id: user.id})
        } catch (error) {
            console.log(error)
            if (error.name == "Invalid email/password") {
                 res.status(400).json({ Access_token: "Invalid email/password" });
              } else if( error.name == "Invalid password") {
                res.status(400).json({ Access_token: "Invalid email/password" });
              } else {
                res.status(500).json(error)
              }
        }
    }
    static async registerUser(req, res, next) {
        try {
            const { username, password, email, phoneNumber, longitude, latitude } =
        req.body;
      const newUser = await User.create({
        username,
        password,
        email,
        phoneNumber,
        longtitude : longitude,
        latitude
      })
      res
        .status(200)
        .json({ message: `User with email ${newUser.email} has been created` });
        } catch (error) {
            // console.log(error)
            // console.log(req.body)
            // res.status(500).json(error)
            next()
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.headers;
            const client_id = process.env.GOOGLE_CLIENT_ID;
            const client = new OAuth2Client(client_id);
            
            const ticket = await client.verifyIdToken({
              idToken: google_token,
              audience: client_id,
            });
            const payload = ticket.getPayload();
            const password = "Error-truussss";
            const username = `${payload.given_name}_${payload.sub}`;
            const user = await User.findOne({ where: { email: payload.email } });
            if (!user) {
              await User.create({
                email: payload.email,
                username,
                password,
                role: "Customer",
              },{hooks : false});
            }
            console.log(user)
            const access_token = sign({ id: user.id, role: user.role });
            res
              .status(200)
              .json({access_token, id: user.id, username: username});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController