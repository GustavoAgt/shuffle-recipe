import RecipeModel from "../models/recipe.model";
import { Recipe } from "../types/recipe.type";
import { User } from "../types/user.type";

const insertRecipe = async (recipe: Recipe) => {
  const response = await RecipeModel.create(recipe);
  return response;
};

const findAllRecipesByUser = async (user: Partial<User>) => {
  const response = await RecipeModel.find({ user: user._id }).populate("user");
  return response;
};
export { insertRecipe, findAllRecipesByUser };
