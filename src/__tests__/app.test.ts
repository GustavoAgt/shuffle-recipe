import { Express } from "express";

import App from "../app";

describe("Testing App.ts", () => {
  const instance: App = App.Instance;

  test("test MongoDB connection", async () => {
    expect.assertions(1);

    const isStarted = await instance.startMongoDB();
    expect(isStarted).toBeTruthy();
  });

  test("test instance singleton", () => {
    expect(instance).toBe(App.Instance);
  });

  test("test getting app", () => {
    const app: Express = instance.getApp();

    expect(app).toBe(App.Instance.getApp());
    expect(app).not.toBeNull();
  });
});
