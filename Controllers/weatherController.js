const axios = require("axios");

class WeatherController {
  static async currentWeather(req, res, next) {
    try {
      const { city } = req.query;

      const result = await axios({
        url: "http://dataservice.accuweather.com/locations/v1/cities/search",
        method: "get",
        params: {
          apikey: "y1JoHfBjsj5NnLAwxcu3OxaAhdbWRTtW",
          q: city,
        },
      });

      const key = result.data[0].Key;

      const { data } = await axios({
        url: `http://dataservice.accuweather.com/currentconditions/v1/${key}`,
        method: "get",
        params: {
          apikey: "y1JoHfBjsj5NnLAwxcu3OxaAhdbWRTtW",
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WeatherController;
