import { Express } from "express";
import App from "../app";
import { generateToken, verifyToken } from "../utils/jwt.handle";

describe("Testing jwt.handle.ts", () => {
   App.Instance.getApp();

  const _id = "631bc00661ce0d630469723b";
  let token = "";
  beforeEach(async () => {
    token = await generateToken(_id);
  });

  test("should generate tokens", () => {
    expect(token).not.toBeUndefined();
    expect(token).toBeTruthy();
  });

  test("should verify tokens", () => {
    const payload: any = verifyToken(token);
    const { id } = payload;
    expect(payload).toBeTruthy();
    expect(id).toBe(_id);
  });
});
