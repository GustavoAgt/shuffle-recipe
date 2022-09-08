import { HttpStatus } from "./../utils/HttpStatus";
import { User } from "../types/user.type";
import UserModel from "../models/user.model";
import HttpException from "../utils/HttpException";
import { Response } from "express";

const insertUser = async (user: User, res: Response) => {
  validateUsername(user.username, res);
  const response = await UserModel.create(user);
  return response;
};

const findUserByUsername = async ({ username }: User, res: Response) => {
  const response = await UserModel.findOne({
    username: username,
  });

  if (response == null) {
    throw new HttpException("User not found", HttpStatus.UNPROCESSABLE_ENTITY);
  }

  return response;
};

const validateUsername = async (username: string, res: Response) => {
  const response = await UserModel.findOne({ username: username });
  if (!username) {
    throw new HttpException(
      "Username is not valid",
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }

  if (response?.username) {
    throw new HttpException(
      "Username already exist",
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
};

export { insertUser, findUserByUsername };
