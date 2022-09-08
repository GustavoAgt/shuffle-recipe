import mongoose, { Schema, model } from "mongoose";
import { Recipe } from "../types/recipe.type";

const RecipeSchema = new Schema<Recipe>({
  title: { type: String, required: true },
  cookingDuration: { type: Number, required: true },
  description: { type: String, required: true },
  user: {type: mongoose.Types.ObjectId, ref: "users"}
});

const RecipeModel = model("recipes", RecipeSchema);
export default RecipeModel;
