const errorHandler = (error, req, res, next) => {
  let errorCode = 500;
  let message = "Internal Server Error";

  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    errorCode = 400;
    message = error.errors[0].message;
  } else if (error.name === "Required") {
    errorCode = 401;
    message = "Email or Password is required";
  } else if (error.name === "Invalid Input") {
    errorCode = 401;
    message = "Invalid email or password";
  } else if (
    error.name === "Error authentication" ||
    error.name === "JsonWebTokenError"
  ) {
    errorCode = 401;
    message = "Invalid authentication";
  }
  res.status(errorCode).json({ message });
};

module.exports = errorHandler;
