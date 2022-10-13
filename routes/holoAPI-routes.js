const express = require("express");
const routerHolo = express.Router();
const HolomemberController = require('../controllers/holoAPI-controller');

routerHolo.get("/", HolomemberController.getChannel);
routerHolo.get("/lives/:id", HolomemberController.getLiveById);
routerHolo.get("/upcomings/:id", HolomemberController.getUpcomingById);


module.exports=routerHolo