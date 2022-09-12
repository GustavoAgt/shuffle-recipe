import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "./../utils/HttpStatus";
import HttpException from "../utils/HttpException";
import { verifyToken } from "../utils/jwt.handle";

export type RequestExt = Request & {
  user?: string | JwtPayload;
};

export const checkSession = (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawJwt = req.headers.authorization || " ";
    const jwt = rawJwt.split(" ")[1];
    const jwtUser = verifyToken(jwt);

    if (jwtUser) {
      req.user = jwtUser;
      next();
    } else {
      throw new HttpException("no valid token", HttpStatus.UNAUTHORIZED);
    }
  } catch (error) {
    res.status(400).send({ error: "no valid session" });
    next(error);
  }
};
