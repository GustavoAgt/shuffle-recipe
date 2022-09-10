import { HttpStatus } from "../utils/HttpStatus";
import { Recipe } from "../types/recipe.type";
import { NextFunction, Request, Response } from "express";
import { findAllRecipesByUser, insertRecipe } from "../services/recipe.service";
import { User } from "../types/user.type";

const findAllRecipes = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = params;
    const user: Partial<User> = Object.assign({}, { _id: id });
    const response = await findAllRecipesByUser(user);
    res.status(HttpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe: Recipe = Object.assign({}, { ...body });
    const response = await insertRecipe(recipe);
    res.status(HttpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
};

export { findAllRecipes, createRecipe };
