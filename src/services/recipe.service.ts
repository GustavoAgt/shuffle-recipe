import RecipeModel from "../models/recipe.model";
import { Recipe } from "../types/recipe.type";

const insertRecipe = async (recipe: Recipe) => {
  const response = await RecipeModel.create(recipe);
  return response;
};

export { insertRecipe };
