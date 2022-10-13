const errorHandler = (err,req,res,next) =>{
    let error = `Internal server error`
    let status = 500

    if(err.name == `SequelizeValidationError` || err.name == `SequelizeUniqueConstraintError`){
        error = err.errors[0].message
        status = 400
    } else if(err.name == 'invalid_credentials'){
        error = `Invalid email or password`
        status = 401
    } else if(err.name == 'invalid_input_email'){
        error = `Email is required`
        status = 400
    } else if(err.name == 'invalid_input_password'){
        error = `Password is required`
        status = 400
    }

    res.status(status).json({message : `${error}`})
}

module.exports = errorHandler