import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDB from "./config/db";

class App {
  public express: express.Application;

  constructor(routers: express.Router[]) {
    this.express = express();
    this.middleware();
    this.initializeRouters(routers);
    this.databaseConnection();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(cors());
  }

  private initializeRouters(routers: express.Router[]): void {
    routers.forEach((route) => {
      this.express.use("/", route);
    });
  }

  private async databaseConnection(): Promise<void> {
    try {
      await connectToDB();
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  public listen(): void {
    this.express.listen(3000, () => {
      console.log("Server läuft auf Port 3000 ");
    });
  }
}
export default App;
