const axios = require("axios");

class NewsController {
  static async getNews(req, res, next) {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          apiKey: "7e37d68141b3471ba2d9c187286b0734",
        },
      });

      res.status(200).json(data.articles);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;
