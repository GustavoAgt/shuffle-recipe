import mongoose, { Schema, model } from "mongoose";
import { Recipe } from "../types/recipe.type";

const RecipeSchema = new Schema<Recipe>({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
});

const RecipeModel = model("Recipes", RecipeSchema);
export default RecipeModel;
