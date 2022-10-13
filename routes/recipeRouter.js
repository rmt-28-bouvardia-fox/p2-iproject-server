const RecipeController = require("../controllers/recipeController");

const router = require("express").Router();

router.get("/", RecipeController.showAllRecipes);
router.get("/:RecipeId", RecipeController.showRecipeDetails);

module.exports = router;
