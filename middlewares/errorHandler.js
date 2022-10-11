const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal server error";

  res.status(code).json({ message });
};

module.exports = errorHandler;
