import { Express } from "express";
import "dotenv/config";
import App from "./src/app";

const PORT = process.env.PORT || 3001;

const instance: App = App.Instance;
const app: Express = instance.getApp();

app.listen(PORT, () => {
 
  instance.startMongoDB().then(() => {
    console.log("⚡️[server]: Shuffle Recipe succesfully connect to MongoDB");
  });
  
  console.log(
    `⚡️[server]: Shuffle Recipe is running at https://localhost:${PORT}`
  );
});
