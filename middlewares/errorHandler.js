const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalid_email") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "invalid_password") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "invalid_credential") {
    code = 401;
    message = "Invalid email/password";
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
