const errorHandler = (err,req,res,next) => {

    let status = 500
    let message = `Internal Server Error`

    if(err.name == `SequelizeValidationError` || err.name == `SequelizeUniqueConstraintError`){
        status = 400
        message = err.errors.map(el => el.message)
    }
    else if(err.name == `Data Not Found`){
        status = 404
        message = err.name
    }
    else if(err.name == `invalid_credentials`){
        status = 401
        message = `Invalid email/password`
    }
    else if (err.name == `invalid token` || err.name == `JsonWebTokenError`){
        status = 401
        message = `Invalid Token`
    }
    else if(err.name == `forbidden`){
        status = 403
        message = `forbidden`
    }
    res.status(status).json(message)
}

module.exports = errorHandler