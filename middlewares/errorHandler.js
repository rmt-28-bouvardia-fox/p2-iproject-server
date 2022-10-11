const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  if (err.name === "invalid_email") {
    status = 400;
    message = `Email is required`;
  } else if (err.name === "invalid_password") {
    status = 400;
    message = `Password is required`;
  } else if (err.name === "invalid_credentials") {
    code = 401;
    message = `Invalid email or password`;
  }
  res.status(status).json({ message });
};

module.exports = errorHandler;
