const errorHandler = (error, req, res, next) => {
  let errorCode = 500;
  let message = "Internal Server Error";

  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    errorCode = 400;
    message = error.errors[0].message;
  }
  res.status(errorCode).json({ message });
};

module.exports = errorHandler;
