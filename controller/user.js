const { User } = require("./../models");
const { compare } = require("./../helpers/bcrypt");
const { createToken } = require("./../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');
const sendMail = require("../email");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const createUser = await User.create({ username, email, password });
      sendMail(createUser)
      res
        .status(201)
        .json({ message: `id:${createUser.id}, email:${createUser.email}` });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Required" };
      }
      if (!password) {
        throw { name: "Required" };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "Invalid Input" };
      }
      const checkPassword = compare(password, findUser.password);

      if (!checkPassword) {
        throw { name: "Invalid Input" };
      }

      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);

      res.status(200).json({ access_token, findUser });
    } catch (error) {
      next(error);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const client_id = process.env.GOOGLE_CLIENT_ID;
      const { google_token } = req.headers;
      const client = new OAuth2Client(client_id);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: client_id, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      //cek apakah user sudah terdaftar atau belum
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "google_oauth",
        },
        hooks: false,
      });

      //generate token jwt
      sendMail(user)
      const access_token = createToken({ id: user.id });
      res.status(200).json({ message: "User created", access_token });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}
module.exports = Controller;
