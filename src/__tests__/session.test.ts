import * as session from "./../middlewares/session";

describe("Testing Session.ts", () => {
  const validToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWJjMDA2NjFjZTBkNjMwNDY5NzIzYiIsImlhdCI6MTY2MjgxNTE5MSwiZXhwIjoxNjYyODU4MzkxfQ.V7zV4ZU1l2yFgnt6rHJ8-8zECTy6UKFql-BA_8xh_wU";
  const mockRequest: any = jest.fn(() => ({
    headers: jest.fn().mockReturnValue({
      authorization: `Bearer ${validToken}`,
    }),
    user: jest.fn(),
  }));

  const mockResponse: any = {
    status: jest.fn().mockReturnValue({ send: jest.fn() }),
  };

  const mockNext: any = jest.fn((error: Error) => {});

  test("Should verify session by request", () => {
    const sessionMock = jest
      .spyOn(session, "checkSession")
      .mockImplementation(jest.fn());

    session.checkSession(mockRequest, mockResponse, mockNext);
    expect(sessionMock).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
