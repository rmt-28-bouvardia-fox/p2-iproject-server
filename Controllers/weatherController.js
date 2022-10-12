const axios = require("axios");

class WeatherController {
  static async currentWeather(req, res, next) {
    try {
      const { city } = req.query;

      const result = await axios({
        url: "http://dataservice.accuweather.com/locations/v1/cities/search",
        method: "get",
        params: {
          apikey: process.env.WEATHER_SECRET,
          q: city,
        },
      });

      const key = result.data[0].Key;

      const { data } = await axios({
        url: `http://dataservice.accuweather.com/currentconditions/v1/${key}`,
        method: "get",
        params: {
          apikey: process.env.WEATHER_SECRET,
        },
      });

      const weatherData = { city: result.data[0], cityCondition: data };

      res.status(200).json(weatherData);
    } catch (error) {
      next(error);
    }
  }

  static async geoLocation(req, res, next) {
    try {
      const { location } = req.query;
      const { data } = await axios({
        url: "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
        method: "get",
        params: {
          apikey: process.env.WEATHER_SECRET,
          q: location,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WeatherController;
