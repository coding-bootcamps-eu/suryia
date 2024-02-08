import App from "./server";
import userRoutes from "./routes/userRoutes";
import statusRoutes from "./routes/statusRoutes";
import linkRoutes from "./routes/linkRoutes";

const app = new App([userRoutes, statusRoutes, linkRoutes]);

app
  .initializeDB()
  .then(() => {
    app.listen();
  })
  .catch((error) => {
    console.error("Failed to initialize the application:", error);
    process.exit(1);
  });

// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
// import session from "express-session";
// import cors from "cors";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";

// import connectToDB from "./db";
// import config from "./config";

// import { UserModel } from "./models/Users";
// import initializePassport from "./middleware/auth";

// class App {
//   public app: express.Application;

//   constructor(routes: Array<express.Router>) {
//     this.app = express();
//     this.initializeMiddleware();
//     this.initializePassport();
//     this.initializeRoutes(routes);
//     this.databaseConnection();
//   }
//   private initializeMiddleware(): void {
//     this.app.use(cors());
//     this.app.use(bodyParser.json());
//     this.app.use(bodyParser.urlencoded({ extended: false }));
//     this.app.use(
//       session({
//         secret: config.PASSPORT_SECRET,
//         resave: false,
//         saveUninitialized: false,
//       })
//     );
//   }
//   private initializePassport(): void {
//     const passportMiddleware = initializePassport();
//     this.app.use(passportMiddleware.initialize());

//     passport.use(new LocalStrategy(UserModel.authenticate()));
//     passport.serializeUser(UserModel.serializeUser());
//     passport.deserializeUser(UserModel.deserializeUser());
//   }

//   private initializeRoutes(routes: Array<express.Router>): void {
//     routes.forEach((route) => {
//       this.app.use("./", route);
//     });
//   }

//   private async databaseConnection(): Promise<void> {
//     try {
//       await connectToDB();
//     } catch (error) {
//       console.error("MongoDB connection error:", error);
//     }
//   }
//   public listen(): void {
//     this.app.listen(config.PORT, () => {
//       console.log(`Server on Port ${config.PORT}`);
//     });
//   }
// }

// export default App;
// /*const app = express();
// app.use(express.json());

// //Connection to mongodb
// connectToDB();

// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/corstest", (req: Request, res: Response) => {
//   res.json({
//     status: "ok",
//   });
// });

// app.use(
//   session({
//     secret: config.PASSPORT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// const passportMiddleware = initializePassport();
// app.use(passportMiddleware.initialize());

// passport.use(new LocalStrategy(UserModel.authenticate()));
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

// app.use("/", userRoutes);
// app.use("/", statusRoutes);
// app.use("/", linkRoutes);

// //Express-Server
// app.listen(config.PORT, () => {
//   console.log(`Server is running on port ${config.PORT}`);
// });*/
