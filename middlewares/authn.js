const { readPayloadFromToken } = require("../helpers/jwt");
const { User } = require("../models");

const authn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readPayloadFromToken(access_token);

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      accountStatus: user.accountStatus
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authn;
