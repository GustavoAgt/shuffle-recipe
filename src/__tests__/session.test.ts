import * as jwt from "../utils/jwt.handle";
import * as session from "./../middlewares/session";
import * as jsonWToken from "jsonwebtoken";

describe("testing session.ts", () => {
  const validToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWJjMDA2NjFjZTBkNjMwNDY5NzIzYiIsImlhdCI6MTY2MjgxNTE5MSwiZXhwIjoxNjYyODU4MzkxfQ.V7zV4ZU1l2yFgnt6rHJ8-8zECTy6UKFql-BA_8xh_wU";
  const req: any = {
    headers: {
      authorization: `Bearer ${validToken}`,
    },
    user: {},
  };

  const res: any = {
    status: jest.fn().mockReturnValue({ send: jest.fn() }),
    send: jest.fn((obj: {}) => {}),
  };

  const obj = { next: jest.fn() };

  test("should verify session by request", () => {
    const spy = jest.spyOn(obj, "next").mockImplementation(jest.fn());
    jsonWToken.verify.prototype = jest.fn().mockImplementation(()=> { return true})
    session.checkSession(req, res, obj.next);
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
