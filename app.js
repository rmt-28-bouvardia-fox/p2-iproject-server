if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  const express = require("express");
  const app = express();
  const port = process.env.PORT || 3000;
  const cors = require("cors");
  const errorHandler = require("./helpers/error-handling");
  const routerUser = require("./routes/user-routes");
  const routerHolo = require('./routes/holoAPI-routes')
  const routerPayment = require('./routes/payment-routes')

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use("/users", routerUser);
  app.use("/payments",routerPayment)
  app.use("/idols",routerHolo)
  
  app.use(errorHandler);
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  module.exports=app
  