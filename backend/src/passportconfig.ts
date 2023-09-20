import passport from "passport";
import passportLocal from "passport-local";
import { UserModel, User } from "./models/Users";

//Passport-LocalStrategy configuration:
passport.use(
  new passportLocal.Strategy((email, password, done) => {
    UserModel.findOne({ email }, (err: string, user: User | null) => {
      if (err) return done(err);
      if (!user.email)
        return done(null, false, { message: "Incorrect email." });
      if (user.password !== password)
        return done(null, false, { message: "Incorrect password." });
      return done(null, user);
    });
  })
);
//Serialize and deserialize User:
passport.serializeUser((user: User, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await UserModel.findById(email);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
