import { HttpStatus } from "./../utils/HttpStatus";
import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

export const exceptionHandle = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    res
      .status(error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }

  next(error);
};
