import App from "./server";
import userRoutes from "./routes/userRoutes";
import statusRoutes from "./routes/statusRoutes";
import linkRoutes from "./routes/linkRoutes";

const app = new App([userRoutes, statusRoutes, linkRoutes]);

app.get("/corstest", (req: Request, res: Response) => {
  res.json({
    status: "ok",
  });
});

app.use(
  session({
    secret: PASSPORT_SECRET,
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
