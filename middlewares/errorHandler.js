const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  console.log(err)

  if (err.name === "SequelizeValidationError" || err.name === "SequelizeConstraintError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "email_is_required") {
    code = 400;
    message = "Please input your email";
  }else if (err.name === "password_is_required") {
    code = 400;
    message = "Please input your email";
  }else if (err.name === "user_exists") {
    code = 400;
    message = "Email is already exists";
  } else if (err.name === "ids_not_provided") {
    code = 400;
    message = "String of ids not provided";
  }else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (err.name === "invalid_credentials") {
    code = 401;
    message = "Invalid Email/Password";
  } else if (err.name === "forbidden") {
    code = 403;
    message = "Forbidden";
  } else if (err.name === "not_found") {
    code = 404;
    message = "Not Found";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
