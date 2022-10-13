const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  console.log(err)

  if (err.name == "AxiosError" && err.response.status) {
    code = 404;
    message = "Card not found";
  } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "email_is_required") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "password_is_required") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "id_is_required") {
    code = 400;
    message = "Id is required";
  } else if (err.name === "currentPrice_is_required") {
    code = 400;
    message = "Current Price is required";
  } else if (err.name === "bid_less_than_currentPrice") {
    code = 400;
    message = "New Bid must be higher than Current Bid";
  } else if (err.name === "already_bidded") {
    code = 400;
    message = "You already bid on this item";
  } else if (err.name === "cardId_is_required") {
    code = 400;
    message = "Card Id is required";
  } else if (err.name === "expiredBy_is_required") {
    code = 400;
    message = "Auction End Datetime is required";
  } else if (err.name === "startPrice_is_required") {
    code = 400;
    message = "Price is required";
  } else if (err.name === "startPrice_min_1000") {
    code = 400;
    message = "Minimum price is 1000";
  } else if (err.name === "ids_not_provided") {
    code = 400;
    message = "String of ids not provided";
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
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
