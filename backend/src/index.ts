import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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
