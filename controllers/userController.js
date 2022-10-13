const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      // res.status(400).json({ message });
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Invalid_Credentials" };
      }

      const validPassword = compare(password, user.password);

      if (!validPassword) {
        throw { name: "Invalid_Credentials" };
      }

      const payload = { id: user.id };
      const access_token = createToken(payload);

      res.status(200).json({ access_token, username: user.username });
      // res.status(200).json({ access_token: "lalala" });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;

      console.log(google_token, "<<< ini token dari google");
      const client_id = process.env.GOOGLE_CLIENT_ID;
      const client = new OAuth2Client(client_id);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: client_id, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });

      const payload = ticket.getPayload();
      // console.log(payload, "<<< ini payload google");

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          username: payload.given_name + "_" + payload.family_name,
          password: "google_oauth",
        },
        hooks: false,
      });

      const access_token = createToken({ id: user.id });

      // console.log(user, "<<<< user");
      // console.log(created, "<<<< created");
      res
        .status(200)
        .json({ message: "ok", access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
