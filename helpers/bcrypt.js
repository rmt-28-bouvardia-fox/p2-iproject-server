let bcrypt = require("bcryptjs");

const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const hash = (password) => {
  return bcrypt.hashSync(password, 8);
};

module.exports = { compare, hash };
