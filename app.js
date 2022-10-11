const express = require("express");
const app = express();
const router = require("./routes");
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
