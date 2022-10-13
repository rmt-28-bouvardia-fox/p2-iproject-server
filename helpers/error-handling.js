const errorHandler = (err, req, res, next) => {
    if (
      err.name === "SequelizeUniqueConstraintError" ||
      err.name === "SequelizeValidationError"
    ) {
      res.status(400).json({ message: err.errors[0].message });
    } else if (err.name === "EmailRequired") {
      res.status(400).json({ message: "Email is Required" });
    } else if (err.name === "PasswordRequired") {
      res.status(400).json({ message: "Password is Required" });
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid Token" });
    } else if (err.name === "Unauthorized") {
      res.status(401).json({ message: "Invalid email/password" });
    } else if (err.name === "Forbidden") {
      res.status(403).json({ message: "You are not authorized" });
    } else if (err.name === "NotFound") {
      res.status(404).json({ message: "Holo not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = errorHandler;
  