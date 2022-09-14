import { HttpStatus } from "./../utils/HttpStatus";
import { Express } from "express";
import App from "../app";
import supertest from "supertest";
import * as controller from "../controllers/user.controller";
import * as service from "../services/user.service";
import { User } from "../types/user.type";
import { userSchema } from "../validation-schemas/user.schema";

describe("Testing user auth controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const app: Express = App.Instance.getApp();
  App.Instance.startMongoDB();

  app.get("/auth/register", (req, res) => {
    res.status(HttpStatus.CREATED).send({});
  });

  test("/auth/register should response with a json", () => {
    supertest(app)
      .get("/auth/register")
      .expect("Content-Type", /json/)
      .expect(HttpStatus.CREATED)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  test("should find user response a json", async () => {
    expect.assertions(1);

    const req: { user: any } = { user: { id: "631b6e2e1556960ae0c5905e" } };
    const req2: { user: any } = { user: { id: "" } };
    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const next = jest.fn();

    const spy = jest.spyOn(service, "findUserServ");
    await controller.findUser(req as any, res, next);
    await controller.findUser(req2 as any, res, next);

    expect(spy).toHaveBeenCalled();
  });

  test("should login user response", async () => {
    expect.assertions(1);

    const req: { body: User } = {
      body: {
        _id: "631b6e2e1556960ae0c5905e",
        username: "Sam1",
        password: "12345678",
      },
    };
    const req2: { user: any } = { user: { id: "" } };
    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const next = jest.fn();

    userSchema.validate = jest.fn().mockImplementation(() => {
      return false;
    });

    const spy = jest.spyOn(service, "loginServ");

    await controller.loginUser(req as any, res, next);
    await controller.loginUser(req2 as any, res, next);

    expect(spy).toHaveBeenCalled();
  });

  test("should login user not response a json", async () => {
    expect.assertions(1);

    const req: { body: User } = {
      body: {
        _id: "631b6e2e1556960ae0c5905e",
        username: "Sam1",
        password: "12345678",
      },
    };

    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const next = jest.fn();

    userSchema.validate = jest.fn().mockImplementation(() => {
      return { error: true };
    });

    const spy = jest.spyOn(service, "loginServ");

    await controller.loginUser(req as any, res, next);

    expect(spy).not.toHaveBeenCalled();
  });

  test("should register an user", async () => {
    const req: { body: User } = {
      body: {
        _id: "631b6e2e1556960ae0c5905e",
        username: "Sam1",
        password: "12345678",
      },
    };

    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const next = jest.fn();

    userSchema.validate = jest.fn().mockImplementation(() => {
      return { error: false };
    });

    service.insertUser.prototype = jest.fn().mockImplementation(() => {
      return false;
    });
    
    const spy = jest.spyOn(service, "insertUser");
    await controller.registerUser(req as any, res, next);

    expect(spy).toHaveBeenCalled();

    userSchema.validate = jest.fn().mockImplementation(() => {
      return { error: true };
    });

    await controller.registerUser(req as any, res, next);

    expect(spy).toHaveBeenCalled();
  });
});
