import { Response } from "express";

class HttpException extends Error {
  constructor(errorMsg: any, public status?: number, res?: Response) {
    super(errorMsg);
    this.name = "HttpException";

    if(res){
      if(status){
        res.status(status).send({error: errorMsg});
      }else {
        res.send({error: errorMsg});
      }
      
    }
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export default HttpException;
