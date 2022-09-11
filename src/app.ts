import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dbConnect from "./config/mongo.config";
import { ConfigRouter } from "./routes/index";
import { exceptionHandle } from "./middlewares/exception.handle";

class App {
  private static _instance: App;
  private readonly app: Express = express();

  private constructor() {
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(new ConfigRouter().autoConfig("routes"));
    this.app.use(exceptionHandle);
  }

  public async startMongoDB(): Promise<boolean> {
    try {
      await dbConnect();
      return true;
    } catch (error) {
      console.log(
        "⚡️[server]: Error connecting to mongo, please check conecction info is properly provided."
      );
    }

    return false;
  }

  public getApp(): Express {
    return this.app;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default App;
