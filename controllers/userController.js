const { comparePassword } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const {User} = require('../models')
const validator = require('validator')
const nodemailer = require('nodemailer')
const sendOTP = require('../helpers/nodemailer')

class UserController {

    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            if (!email) {
                throw { name: 'no_credentials', err: 'Email is required' }
            }
            if (!password) {
                throw { name: 'no_credentials', err: 'Password is required' }
            }
            let result = await User.create({ name, email, password })
            const payload = {id: result.id}
            const access_token = getToken(payload)
            res.status(201).json({ id: result.id, name: result.name, access_token })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw{name: 'no_credentials', err: 'Email is required'}
            }
            if (!password) {
                throw { name: 'no_credentials', err: 'Password is required' }
            }
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'error_login' }
            }
            const passwordValid = comparePassword(password, user.password)
            if (!passwordValid) {
                throw { name: 'error_login' }
            }
            const payload = { id: user.id }
            const access_token = getToken(payload)

            res.status(200).json({ access_token, name: user.name, email: user.email })
        } catch (error) {
            next(error)
        }
    }

    static async verifyEmail(req, res, next) {
        try {
            const email = req.body.email
            const otp = await sendOTP(email)
            if (!otp) {
                throw{name: 'error_login'}
            }
            res.status(200).json({ otp })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController