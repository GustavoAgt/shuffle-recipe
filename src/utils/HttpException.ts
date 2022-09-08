import { Response } from "express";

class HttpException extends Error {
  constructor(errorMsg: any, public status?: number) {
    super(errorMsg);
    this.name = "HttpException";
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export default HttpException;
