const routes = require('express').Router()
const UserController = require('../controllers/userController')
const { decodeToken } = require('../helpers/jwt')
const { route } = require('./vehicleRoutes')
const vRoutes = require('./vehicleRoutes')
const tPApi = require('./thirdParty')


routes.post('/login', UserController.login)
routes.post('/register', UserController.register)
routes.use('/tpapi', tPApi)
routes.use( async (req,res, next) =>{
    try{
        const access_token = req.headers.access_token
        if(!access_token){
            throw {name: 'Invalid Token!'}
        }
        const user = decodeToken(access_token)
        if(!user){
            throw {name: 'Invalid Token!'}
        }
        req.user = {
            id: user.id
        }
        next()
    }catch(err){
        next(err)
    }
})
routes.use('/vehicles', vRoutes)
routes.use((err, req, res,next) =>{
    code = 500
    message = 'Internal server error!'
    if(err.name === "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError'){
        code = 400
        message = err.errors[0].message
    }else if(err.name === 'Username/password is incorrect !'){
        code = 401
        message = err.name
    }else if (err.name === 'Invalid Token!'){
        code = 403
        message = "Invalid Token!"
    }else if(err.name === 'Not found!'){
        code = 404
        message = 'Not Found !'
    }else if(err.name === "Forbidden !"){
        code = 403
        message = "Forbidden !!"
    }
    res.status(code).json({message})
})

module.exports = routes