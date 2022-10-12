const errorHandler = (error, req, res, next) => {
    console.log(error)
    const code = 500
    const message = "Internal Server Error"
    if(error.name == 'Arisan Already exists') {
        code = 400
        message = error.name
    } else if (error.name == 'Invalid token'){
        code = 401
        message = error.name
    }

    res.status(code).json(message)
}
module.exports = errorHandler