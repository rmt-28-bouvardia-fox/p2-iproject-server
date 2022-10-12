const errorHandler = (error, req, res, next) => {
    const code = 500
    const message = "Internal Server Error"
    if(error.name == '')

    res.status(code).json(message)
}