import { RequestExt } from "./../middlewares/session";
import { HttpStatus } from "./../utils/HttpStatus";
import { NextFunction, Request, Response } from "express";
import { insertUser, loginServ, findUserServ } from "../services/user.service";
import { User } from "../types/user.type";
import HttpException from "../utils/HttpException";
import { userSchema } from "../validation-schemas/user.schema";

const registerUser = async (
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

    const response = await insertUser(user);

    if (response instanceof HttpException) {
      throw response;
    }
    res.status(HttpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (
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

    const response = await loginServ(user);

    if (response instanceof HttpException) {
      throw response;
    }

    res.status(HttpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

const findUser = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const id = (req.user as any).id;    
    const response: User = (await findUserServ(id)) as User;
    res.status(HttpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, findUser };
