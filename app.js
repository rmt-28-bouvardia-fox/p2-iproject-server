const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");

const errorHandler = require("./middlewares/errorHandler");

const firebase = require("./config/firebase.config");
const { ref, get, push, child, update, query, remove, orderByChild, equalTo } = require("firebase/database");
const dbRef = ref(firebase, "/bids");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  // console.log(process.env.NODE_ENV)
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

// ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
