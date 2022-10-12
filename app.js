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

const { ref, get, push, child, update, query, remove, orderByChild, equalTo } = require("firebase/database");
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

    console.log(user);

    res.status(200).json({ access_token, username: user.username });
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

app.get("/bid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { name: "id_is_required" };
    }

    const bid = await get(child(dbRef, id));

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params: {
        id: bid.val().cardId,
      },
    });

    const cardDetail = data.data[0];
    let detailBid = {
      ...bid.val(),
      cardDetail,
    };

    res.status(200).json(detailBid);
  } catch (error) {
    next(error);
  }
});

app.post("/card/details", async (req, res, next) => {
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

app.get("/card/search", async (req, res, next) => {
  try {
    const { query, offset, num, type, race, attribute } = req.query;

    let params = {};

    if (query) {
      params.fname = query;
    }

    if (type) {
      params.type = type;
    }

    if (race) {
      params.race = race;
    }

    if (attribute) {
      params.attribute = attribute;
    }

    if (offset && num) {
      params.offset = offset;
      params.num = num;
    } else {
      params.offset = 0;
      params.num = 5;
    }

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params,
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// AUTHENTICATION
app.use(authentication);

app.get("/user", async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

// bid / use dbRef
app.post("/my-bid", async (req, res, next) => {
  try {
    const { cardId, expiredBy, startPrice, notes, condition } = req.body;

    if (!cardId) {
      throw { name: "cardId_is_required" };
    }

    if (!expiredBy) {
      throw { name: "expiredBy_is_required" };
    }

    if (!startPrice) {
      throw { name: "startPrice_is_required" };
    }

    if (startPrice < 1000) {
      throw { name: "startPrice_min_1000" };
    }

    let expired = new Date(expiredBy);

    await push(dbRef, {
      sellerId: req.user.id,
      createdBy: req.user.username,
      buyerId: "",
      cardId: cardId,
      createdAt: new Date().getTime(),
      condition: condition,
      startPrice: startPrice,
      currentPrice: startPrice,
      expiredBy: expired.getTime(),
      note: notes,
    });

    res.status(200).json({ message: "Success add new bid" });
  } catch (error) {
    next(error);
  }
});

// bid / use dbRef
app.patch("/my-bid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let { currentPrice } = req.body;

    if (!id) {
      throw { name: "id_is_required" };
    }

    if (!currentPrice) {
      throw { name: "currentPrice_is_required" };
    }

    const bid = await get(child(dbRef, id));

    const bidValue = bid.val();

    if (bidValue.sellerId == req.user.id) {
      throw { name: "forbidden" };
    }

    if (bidValue.buyerId == req.user.id) {
      throw { name: "already_bidded" };
    }

    if (bidValue.currentPrice >= currentPrice) {
      throw { name: "bid_less_than_currentPrice" };
    }

    await update(child(dbRef, id), { currentPrice: parseInt(currentPrice), buyerId: req.user.id });

    res.status(200).json({ message: "Bid success!" });
  } catch (error) {
    next(error);
  }
});

// bid / use dbRef
app.get("/my-bid/winning", async (req, res, next) => {
  try {
    let snapshot = await get(query(dbRef, orderByChild("buyerId"), equalTo(req.user.id)));

    let bids = [];

    snapshot.forEach((item) => {
      let data = item.val();
      if (data.expiredBy < new Date().getTime()) {
        let key = item.key;
        let card = {
          key: key,
          buyerId: data.buyerId,
          condition: data.condition,
          sellerId: data.sellerId,
          currentPrice: data.currentPrice,
          startPrice: data.startPrice,
          createdBy: data.createdBy,
          createdAt: data.createdAt,
          expiredBy: data.expiredBy,
          cardId: data.cardId,
          note: data.note,
        };

        bids.push(card);
      }
    });

    let stringOfIDs = bids.map((e) => e.cardId);
    stringOfIDs = stringOfIDs.join(",");

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params: {
        id: stringOfIDs,
      },
    });

    const payload = bids.map((e) => {
      const cardDetail = data.data.find((data) => data.id == e.cardId);

      return {
        ...e,
        cardDetail,
      };
    });

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
});

// bid / use dbRef
app.get("/my-bid/selling", async (req, res, next) => {
  try {
    let snapshot = await get(query(dbRef, orderByChild("sellerId"), equalTo(req.user.id)));

    let bids = [];

    snapshot.forEach((item) => {
      let key = item.key;
      let data = item.val();
      let card = {
        key: key,
        buyerId: data.buyerId,
        condition: data.condition,
        sellerId: data.sellerId,
        currentPrice: data.currentPrice,
        startPrice: data.startPrice,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
        expiredBy: data.expiredBy,
        cardId: data.cardId,
        note: data.note,
      };

      bids.push(card);
    });

    let stringOfIDs = bids.map((e) => e.cardId);
    stringOfIDs = stringOfIDs.join(",");

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params: {
        id: stringOfIDs,
      },
    });

    const payload = bids.map((e) => {
      const cardDetail = data.data.find((data) => data.id == e.cardId);

      return {
        ...e,
        cardDetail,
      };
    });

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
});

app.post("/my-bid/payment", async (req, res, next) => {
  try {
    const { payload } = req.body;

    let getCurrentTimestamp = () => {
      return "" + Math.round(new Date().getTime() / 1000);
    };

    const { data } = await axios({
      // Below is the API URL endpoint
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic " + Buffer.from("SB-Mid-server-4rr4Bjd0BS96pkTbn_9YXtrP").toString("base64"),
        // Above is API server key for the Midtrans account, encoded to base64
      },
      data:
        // Below is the HTTP request body in JSON
        {
          transaction_details: {
            order_id: "ORDER_" + getCurrentTimestamp() + "_" + payload.key,
            gross_amount: parseInt(payload.currentPrice),
          },
          item_details: [
            {
              price: parseInt(payload.currentPrice),
              quantity: 1,
              name: payload.cardDetail.name,
              merchant_name: payload.createdBy,
            },
          ],
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: req.user.username,
            email: req.user.email,
            phone: req.user.phoneNumber,
          },
        },
    });

    data.id = payload.key;

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/my-bid/payment-callback", async (req, res, next) => {
  try {
    const { id } = req.body;

    await remove(child(dbRef, id));

    res.status(200).json({ message: "Success delete bid" });
  } catch (error) {
    next(error);
  }
});

// ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
