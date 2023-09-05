import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./config";

dotenv.config();

const app = express();
const port = config.app.port || 8080;

//Connect to mongodb using the configuration

const dbURI: string =
  "mongodb://${config.db.host}:${config.db.port}:${config.db.name}";

mongoose
  .connect(dbURI, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.use(
  cors({
    //origin: "https://google.com",
  })
);

app.use(bodyParser.json());

app.get("/corstest", (req: Request, res: Response) => {
  res.json({
    status: "ok",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server runnig at http://localhost:" + process.env.PORT);
});
