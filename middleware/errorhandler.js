const errorHandler = (error, req, res, next) => {
    // console.log(error)
    let code = 500
    let message = 'Internal Server Error'
    if(error.name === "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
        code = 400
        message = error.errors[0].message
    } else if(error.name == "invalid"){
        code = 404
        message = `data not found`
    } else if(error.name === "invalid_token" || error.name === 'JsonWebTokenError') {
        code = 401
        message = `please login before you access`
    } else if (error.name === "forbidden") {
        code = 403
        message = `you have no access`
    }  else if(error.name == "invalid_login"){
        code = 401
        message = `invalid email/password`
    } else if(error.name == 'invalid_email') {
        code: 400
        message = `email already used`
    } else if(error.name == 'invalid_genre') {
        code: 400
        message = `genre already exist`
    }
    res.status(code).json({ message })
}

module.exports = errorHandler