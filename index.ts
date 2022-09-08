import { Express } from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

import App from "./src/app";

const app: Express = App.Instance.getApp();

app.listen(8001, () =>
  console.log(
    `⚡️[server]: Shuffle Recipe is running at https://localhost:${PORT}`
  )
);
