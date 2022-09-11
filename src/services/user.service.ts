import { Response } from "express";
import { hashPassword, verifyPassword } from "./../utils/security.handle";
import { HttpStatus } from "./../utils/HttpStatus";
import { User } from "../types/user.type";
import UserModel from "../models/user.model";
import HttpException from "../utils/HttpException";
import { generateToken } from "../utils/jwt.handle";

const insertUser = async (user: User) => {
  const exception = await validateUsername(user.username);

  if (exception) {
    return exception;
  }

  const pwdHashed = await hashPassword(user.password);

  const response = await UserModel.create({ ...user, password: pwdHashed });
  return response;
};

const findUserByUsername = async (username: string) => {
  const response = await UserModel.findOne({
    username,
  });

  if (response == null) {
    return new HttpException("user not found", HttpStatus.UNPROCESSABLE_ENTITY);
  }

  return response;
};

const validateUsername = async (username: string) => {
  const response = await findUserByUsername(username);

  if (!(response instanceof HttpException)) {
    if (!username) {
      return new HttpException(
        "username is not valid",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (response?.username) {
      return new HttpException(
        "username already exist",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }
};

const loginServ = async ({ username, password }: User) => {
  const response = await findUserByUsername(username);

  if (response instanceof HttpException) {
    return response;
  }

  const isAVerifiedPwd = await verifyPassword(
    password,
    (response as User).password
  );

  if (isAVerifiedPwd && response._id) {
    const token = await generateToken(response._id);

    return { token, user: { id: response._id, username: response.username } };
  } else {
    return new HttpException("incorrect password", HttpStatus.FORBIDDEN);
  }
};

export { insertUser, loginServ };
