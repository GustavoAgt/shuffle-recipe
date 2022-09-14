import { User } from "../types/user.type";
import UserModel from "../models/user.model";
import * as userServ from "../services/user.service";
import App from "../app";
import HttpException from "../utils/HttpException";

describe("Testins user.services.ts", () => {
  const instance = App.Instance;

  instance.startMongoDB().then(() => {});

  const mockUser: User = {
    username: "Gustav",
    password: "Eiffel",
  }

  test("should insert an user", async () => {
    expect.assertions(1);

    UserModel.create = jest.fn().mockImplementation(() => {
      return {
        ...mockUser,
      };
    });

    const response: any = await userServ.insertUser(mockUser);

    expect(response.username).toBe(mockUser.username);
  });

  test("should insert an user should throw exception", async () => {
    expect.assertions(1);

    UserModel.create = jest.fn().mockImplementation(() => {
      return {
        ...mockUser,
      };
    });

    const response: any = await userServ.insertUser({
      ...mockUser,
      username: "gavo",
    });

    expect(response).toBeInstanceOf(HttpException);
  });

  test("should test login service process", async () => {
    const response = await userServ.loginServ({
      username: "gavo",
      password: "dragon12345",
    });

    const response2 = await userServ.loginServ({
      username: "",
      password: "dragon12345",
    });

    const response3 = await userServ.loginServ({
      username: "Clint",
      password: "dragon12345",
    });

    expect(response).toBeInstanceOf(HttpException);
    expect(response2).toBeInstanceOf(HttpException);
    expect((response3 as any).token).toBeTruthy();
  });

  test("should find user by id", async () => {
    const id = "testid";
    UserModel.findOne = jest.fn().mockReturnValue({ username: "Gustav" });
    const response = await userServ.findUserServ(id);

    expect((response as any).username).toBe("Gustav");
  });
});
