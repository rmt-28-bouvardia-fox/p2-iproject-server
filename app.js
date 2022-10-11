const express = require("express");
const cors = require("cors");
const exp = require("constants");
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})