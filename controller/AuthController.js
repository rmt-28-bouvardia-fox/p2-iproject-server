const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

const getUser = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
}

const postRegister = async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    const newUser = await User.create({ username, email, password, phoneNumber });

    res.status(200).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) throw { name: "email_is_required" };
    if (!password) throw { name: "password_is_required" };

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw { name: "invalid_credentials" };
    }

    const isValid = compare(password, user.password);

    if (!isValid) {
      throw { name: "invalid_credentials" };
    }

    const payload = {
      id: user.id,
    };

    const access_token = signToken(payload, "secretkey");

    res.status(200).json({ access_token, username: user.username });
  } catch (error) {
    next(error);
  }
};

const postLoginGoogle = async (req, res, next) => {
  try {
    const { google_token } = req.headers;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const [user, created] = await User.findOrCreate({
      where: { email: payload.email },
      defaults: {
        email: payload.email,
        username: payload.given_name + "_" + payload.family_name,
        password: "google_oauth",
        phoneNumber: "",
      },
    });

    const payloadFind = {
      id: user.id,
    };
    const access_token = signToken(payloadFind);

    res.status(200).json({ access_token, username: user.username });
  } catch (error) {
    next(error);
  }
};

module.exports = { postLogin, postRegister, postLoginGoogle, getUser };
