const WeatherController = require("../Controllers/weatherController");
const router = require("express").Router();

router.get("/", WeatherController.currentWeather);

module.exports = router;
