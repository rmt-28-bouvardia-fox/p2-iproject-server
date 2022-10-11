const errorHandler = (err,req,res,next) =>{
    console.log(err)
    let error = `Internal server error`
    let status = 500

    if(err.name == `SequelizeValidationError` || err.name == `SequelizeUniqueConstraintError`){
        error = err.errors[0].message
        status = 400
    }

    res.status(status).json({message : `${error}`})
}

module.exports = errorHandler