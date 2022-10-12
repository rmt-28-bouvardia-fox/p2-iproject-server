const {User} = require('../models')
const axios = require('axios')
const { compare } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const Client_Id = process.env.Client_Id 

class Controller {

    static async register(req,res,next){
        try {
            const {username,email,password} = req.body
            const AbstractKey = process.env.AbstractKey

            const valid = await axios({
                method:'get',
                url:`https://emailvalidation.abstractapi.com/v1/`,
                params:{
                    api_key:AbstractKey,
                    email:email
                }
            })
            if(!valid) throw {name:`invalid_credentials`}

            if(valid.data.is_smtp_valid.value == true){
                const nodemailer = require('nodemailer')

                const transporter = nodemailer.createTransport({
                    host:`smtp.gmail.com`,
                    port:587,
                    auth:{
                        user:process.env.email,
                        pass:process.env.nodemailerpass
                        },
                    tls:{
                        rejectUnauthorized:false
                    }
                    })

                const mailOption = {
                    from:`nodemailer`,
                    to : email,
                    subject:`Verification`,
                    text:`send email`
                    }

                const user = await User.findOne({
                    where:{
                        email:email
                    }
                })

                if(!user){
                    transporter.sendMail(mailOption,(err,info) => {
                    if(err) throw err
                    User.create({
                    username,
                    email,
                    password
                    })
                    .then(() => {
                        res.status(201).json({message:`Created`})
                    })
                    .catch(err => next(err))
                    })
                }
                else{
                    throw {name:`email unique`}
                }
            }
            else{
                throw {name:`invalid_credentials`}
            }
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            const { email,password } =req.body
            const user = await User.findOne({ where: { email } })

            if(!user) throw {name:`invalid_credentials`}

            const validate = compare(password,user.password)

            if(!validate) throw {name:`invalid_credentials`}

            const payload = {
                id:user.id,
                email:user.email,
                username:user.username
            }

            const access_token = createToken(payload)

            res.status(200).json({
                access_token : access_token,
                id:user.id,
                status:user.status,
                username:user.username
            })
        } catch (err) {
            next(err)
        }
    }

    static async google(req,res,next){
        try {
            
        } catch (err) {
            
        }
    }

}

module.exports = Controller