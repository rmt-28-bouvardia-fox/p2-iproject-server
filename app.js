const axios = require("axios");
const cors = require("cors");
const express = require("express");
const firebase = require("./config/firebase.config");
const { compare } = require("./helpers/bcrypt");
const { signToken } = require("./helpers/jwt");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = 3000;

const { ref, set, push } = require("firebase/database");
const dbRef = ref(firebase, "/bids");

const { User } = require("./models");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  // console.log(process.env.NODE_ENV)
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login", async (req, res, next) => {
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

    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    const newUser = await User.create({ username, email, password, phoneNumber });

    res.status(200).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    next(error);
  }
});

app.post("/getCardDetails", async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids) {
      throw { name: "ids_not_provided" };
    }

    const stringOfIDs = ids.replace(/\s+/g, "");

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params: {
        id: stringOfIDs,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// AUTHENTICATION
app.use(authentication);

app.post("/bids", async (req, res, next) => {
  try {
    const { cardId, expiredBy, startPrice } = req.body;

    if (!cardId) {
      throw { name: "cardId_not_provided" };
    }

    if (!expiredBy) {
      throw { name: "expiredBy_not_provided" };
    }

    if (!startPrice) {
      throw { name: "startPrice_not_provided" };
    }

    let expired = new Date(expiredBy);

    const data = await push(dbRef, {
      sellerId: req.user.id,
      buyerId: "",
      cardId: cardId,
      createdAt: new Date().getTime(),
      startPrice: startPrice,
      currentPrice: startPrice,
      expiredBy: expired.getTime(),
      note: "abc",
    });

    res.status(200).json({ message: "Success add new bid" });
  } catch (error) {
    next(error);
  }
});

// ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
