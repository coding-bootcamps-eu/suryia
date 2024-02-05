import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDB from "./db";
import config from "./config";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "./models/Users";
import initializePassport from "./middleware/auth";
import session from "express-session";
import userRoutes from "./routes/userRoutes";
import statusRoutes from "./routes/statusRoutes";
import linkRoutes from "./routes/linkRoutes";

const app = express();
app.use(express.json());

//Connection to mongodb
connectToDB();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/corstest", (req: Request, res: Response) => {
  res.json({
    status: "ok",
  });
});

app.use(
  session({
    secret: config.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
const passportMiddleware = initializePassport();
app.use(passportMiddleware.initialize());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use("/", userRoutes);
app.use("/", statusRoutes);
app.use("/", linkRoutes);

//Express-Server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
