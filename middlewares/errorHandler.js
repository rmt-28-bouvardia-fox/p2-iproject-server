const errorHandler = (err, req, res, next) => {
  console.log(error)
  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "not_found") {
    code = 404;
    message = "Not Found";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = "Email already Used";
  } else if (err.name === "invalid_credential") {
    code = 401;
    message = "Username / Password Incorrect";
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (err.name === "forbidden") {
    code = 403;
    message = "Not Authorize";
  } else if (err.name === "invalid_url") {
    code = 400;
    message = "Image url format is required";
  } else if (err.name === "invalid_input") {
    code = 400;
    message = "Invalid input";
  } else if (err.name === "imgflip_error") {
    code = 400;
    message = err.message;
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
