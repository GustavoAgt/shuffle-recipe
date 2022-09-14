import { HttpStatus } from './../utils/HttpStatus';
import HttpException from "../utils/HttpException";
import { exceptionHandle } from "./../middlewares/exception.handle";

describe("testing exception handle", () => {
  test("should manage exception", () => {
    let mockErr = new HttpException("");
    const req: any = {};
    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const obj = { next: jest.fn()};
    const spy = jest.spyOn(obj, "next");
    exceptionHandle(mockErr, req, res, obj.next);

    expect(spy).toHaveBeenCalled();
  });
});
