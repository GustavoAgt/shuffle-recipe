import { HttpStatus } from "./../utils/HttpStatus";
import { NextFunction, Request, Response } from "express";
import { insertUser, findUserByUsername } from "../services/user.service";
import { User } from "../types/user.type";
import HttpException from "../utils/HttpException";
import { userSchema } from "../validation-schemas/user.schema";

const createUser = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = Object.assign({}, { ...body });
    const error = userSchema.validate(user).error;

    if (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const response = await insertUser(user, res);

    res.status(HttpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
};

const login = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = Object.assign({}, { ...body });
    const error = userSchema.validate(user).error;

    if (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const response = await findUserByUsername(user, res);
    res.status(HttpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

const findAllRecipes = async () => {};

export { createUser, login, findAllRecipes };
