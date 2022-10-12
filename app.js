if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const http = require("http");
const server = http.createServer(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
