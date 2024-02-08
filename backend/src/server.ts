import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import connectToDB from "./db";
import config from "./config";

import { UserModel } from "./models/Users";
import initializePassport from "./middleware/auth";

class App {
  public app: express.Application;

  constructor(routes: Array<express.Router>) {
    this.app = express();
    this.initializeMiddleware();
    this.initializePassport();
    this.initializeRoutes(routes);
  }
  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: config.PASSPORT_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );
  }
  private initializePassport(): void {
    const passportMiddleware = initializePassport();
    this.app.use(passportMiddleware.initialize());

    passport.use(new LocalStrategy(UserModel.authenticate()));
    passport.serializeUser(UserModel.serializeUser());
    passport.deserializeUser(UserModel.deserializeUser());
  }

  private initializeRoutes(routes: Array<express.Router>): void {
    routes.forEach((route) => {
      this.app.use("./", route);
    });
  }

  public async initializeDB(): Promise<void> {
    try {
      await connectToDB();
      console.log("Database connection successful");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Database connection failed");
    }
  }

  public listen(): void {
    this.app.listen(config.PORT, () => {
      console.log(`Server on Port ${config.PORT}`);
    });
  }
}

export default App;

// import App from "./index";
// import userRoutes from "./routes/userRoutes";
// import statusRoutes from "./routes/statusRoutes";
// import linkRoutes from "./routes/linkRoutes";

// const app = new App([userRoutes, statusRoutes, linkRoutes]);

// app.listen();
