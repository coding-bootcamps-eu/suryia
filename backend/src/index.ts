import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { ConnectOptions, startSession } from "mongoose";
import connectToDB from "./db";
import { PORT, MONGODB_URI, API_VERSION } from "./config";
import { Status } from "./models/Status";
import passport from "./passportconfig";

const app = express();
app.use(express.json());

//Connection to mongodb
connectToDB();

//Return the MongoDB connection status and store the API version in the database:
app.get("/status", async (req: Request, res: Response) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1;
    const status = await Status.findOne({});

    if (!status) {
      console.log("Status not found!");
      res.status(404).json({ error: "Status not found!" });
    }
    console.log("Status saved successfully");
    res.json({
      status: {
        db: dbStatus,
      },
      api_version: API_VERSION,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(passport.initialize());
app.use(passport.session());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
startSession();
