import { HttpStatus } from "../utils/HttpStatus";
import { Recipe } from "../types/recipe.type";
import { NextFunction, Request, Response } from "express";
import { findAllRecipesByUser, insertRecipe } from "../services/recipe.service";
import { User } from "../types/user.type";
import { recipeSchema } from "../validation-schemas/recipe.schema";
import HttpException from "../utils/HttpException";

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
    
    const error = recipeSchema.validate(recipe).error;
    if (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const response = await insertRecipe(recipe);
    res.status(HttpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
};

export { findAllRecipes, createRecipe };
