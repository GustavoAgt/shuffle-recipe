import { HttpStatus } from "./../utils/HttpStatus";
import App from "../app";
import HttpException from "../utils/HttpException";

describe("Testing HttpException.ts", () => {
  const app = App.Instance.getApp();

  const mockResponse: any = {
    status: jest.fn().mockReturnValue({send: jest.fn()}),
    send: jest.fn((obj: {}) => {}),
  };

  test("should create a Exception with HttpException", () => {
    const exception = new HttpException("Https Exception");

    expect(exception).toBeInstanceOf(Error);
    expect(() => {
      throw exception;
    }).toThrow();
    expect(() => {
      throw exception;
    }).toThrowError(HttpException);
  });

  test("should create a Exception with HttpException with status", () => {
    const exception = new HttpException(
      "Https Exception",
      HttpStatus.BAD_REQUEST,
      mockResponse
    );

    expect(exception).toBeInstanceOf(Error);
    expect(() => {
      throw exception;
    }).toThrow();
    expect(() => {
      throw exception;
    }).toThrowError(HttpException);
  });

  test("should create a Exception with HttpException without status", () => {
    const exception = new HttpException("Https Exception", 0, mockResponse);

    expect(exception).toBeInstanceOf(Error);
    expect(() => {
      throw exception;
    }).toThrow();

    expect(() => {
      throw exception;
    }).toThrowError(HttpException);
  });
});
