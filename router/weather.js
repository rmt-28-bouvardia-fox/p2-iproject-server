const WeatherController = require("../Controllers/weatherController");
const router = require("express").Router();

router.get("/", WeatherController.currentWeather);
router.get("/geolocations", WeatherController.geoLocation);

module.exports = router;
