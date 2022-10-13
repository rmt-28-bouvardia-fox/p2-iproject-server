
const errorHandlers = async (err, req, res, next) => {
    let code = 500
    let message = "Internal Server Error"
    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError' || err.name == 'invalid_email') {
        code = 400
        message = err.errors.map((el) => {
            return el.message;
        });
    } else if (err.name == 'error_buy' || err.name == 'bad_request') {
        code = 402
        message = err.err
    } else if (err.name == 'error_login') {
        code = 401
        message = "invalid email or password"
    } else if (err.name == "invalid_credentials") {
        code = 404
        message = "error not found"
    } else if (err.name == "forbidden") {
        code = 403
        message = "forbidden"
    } else if (err.name == 'no_credentials') {
        code = 400
        message = err.err
    }
    res.status(code).json(message)
}

module.exports = errorHandlers