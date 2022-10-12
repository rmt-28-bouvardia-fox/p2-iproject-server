const axios = require("axios");
const { News } = require("../models");

class NewsController {
  static async getTopHeadlinesNews(req, res, next) {
    try {
      const { country, category } = req.query;

      const { data } = await axios({
        method: "get",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country,
          apiKey: "730bcb35a0aa43aea6e379da99cb7bc4",
          category,
        },
      });

      await res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getNewsSources(req, res, next) {
    try {
      const { country } = req.query;

      const { data } = await axios({
        url: "https://newsapi.org/v2/top-headlines/sources",
        method: "get",
        params: {
          country,
          apiKey: "730bcb35a0aa43aea6e379da99cb7bc4",
        },
      });

      await res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;
