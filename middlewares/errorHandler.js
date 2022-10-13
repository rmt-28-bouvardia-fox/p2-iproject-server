const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = `Internal server error`;

  if (
    error.name == "SequelizeValidationError" ||
    error.name == "SequelizeUniqueConstraintError"
  ) {
    error = error.errors[0].message;
    code = 400;
    message = error;
  } else if (error.name == "data not found") {
    code = 404;
    message = `Data not found`;
  } else if (error.name == `invalid_credentials`) {
    code = 401;
    message = `Invalid email or password`;
  } else if (
    error.name == `invalid token` ||
    error.name == `JsonWebTokenError`
  ) {
    code = 401;
    message = `Invalid token`;
  } else if (error.name == `forbidden`) {
    code = 403;
    message = `Forbidden`;
  } else if (error.name == "already") {
    code = 400;
    message = "You already add this movie to your favorite";
  } else if (error.name == "body_missing") {
    code = error.status;
    message = error.message;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
