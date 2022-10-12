const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  if (err.name === "invalid_email") {
    status = 400;
    message = `Email is required`;
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalid_password") {
    status = 400;
    message = `Password is required`;
  } else if (err.name === "invalid_email_address") {
    status = 400;
    message = `Please use valid email address`;
  } else if (err.name === "duplicate_patient_details") {
    status = 400;
    message = `Please already have patient details`;
  } else if (err.name === "invalid_credentials") {
    status = 401;
    message = `Invalid email or password`;
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    status = 401;
    message = `Please login first`;
  } else if (err.name === "forbidden" ) {
    status = 403;
    message = `You are not authorized`;
  } else if (err.name === "data_not_found" ) {
    status = 404;
    message = `Data not found`;
  }
  res.status(status).json({ message });
};

module.exports = errorHandler;
