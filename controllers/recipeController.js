const axios = require("axios");

class RecipeController {
  static async showAllRecipes(req, res, next) {
    //
    try {
      const result = await axios({
        method: `GET`,
        url: `https://www.themealdb.com/api/json/v1/1/search.php?f=c`,
      });
      // console.log(result.data);
      // console.log("triggered");

      if (!result.data) {
        throw {
          name: `NOTFOUND`,
        };
      }

      res.status(200).json(result.data);
    } catch (error) {
      // console.log(error, "<<< error");
      next(error);
    }
  }

  static async showRecipeDetails(req, res, next) {
    //
    const RecipeId = req.params.RecipeId;
    try {
      const result = await axios({
        method: `GET`,
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeId}`,
      });
      // console.log(result.data.meals);
      // console.log("triggered");

      if (!result.data.meals) {
        throw {
          name: `NOTFOUND`,
        };
      }

      res.status(200).json(result.data.meals);
    } catch (error) {
      // console.log(error, "<<< error");
      next(error);
    }
  }
}

module.exports = RecipeController;
