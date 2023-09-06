import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { ConnectOptions, startSession } from "mongoose";
import { PORT, MONGODB_URI, API_VERSION } from "./config";
import { Status } from "./models/Status";

const app = express();
app.use(express.json());

//Connect to mongodb using the configuration
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get('"/status"', async (req: Request, res: Response) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1;
    const status = new Status({ db: dbStatus });
    await status.save();
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
