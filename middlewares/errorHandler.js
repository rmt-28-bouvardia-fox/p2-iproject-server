const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors.map((el) => el.message);
  } else if (err.name === "Invalid_Credentials") {
    code = 401;
    message = "error invalid email or password";
  } else if (err.name === "invalid token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "invalid token";
  } else if (err.name === "NOTFOUND") {
    code = 404;
    message = "Recipe Not Found";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
