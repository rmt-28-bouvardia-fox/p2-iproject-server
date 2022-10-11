if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  //cuma dipakai di tahap development dan testing
}

const port = 3000;
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes"));
app.use(require("./middlewares/errorHandler"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
