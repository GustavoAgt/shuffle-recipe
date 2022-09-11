import { Router } from "express";
import { createRecipe, findAllRecipes } from "../controllers/recipe.controller";
import { checkSession } from "../middlewares/session";

const router = Router();
router.get("/all/:id", checkSession, findAllRecipes);
router.post("/", checkSession, createRecipe);

export { router };
