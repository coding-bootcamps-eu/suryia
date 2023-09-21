import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import { UserModel, User } from "./models/Users";
import { config } from "./config";

const jwtOptions: StrategyOptions = {
  //Authorization: Bearer in request headers
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default function initializePassport() {
  // Post-Verified token
  const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find user in MongoDB using the `id` in the JWT
      const user = await UserModel.findById(payload.id);

      if (!user) {
        return done(new Error("UserNotFound"), null);
      } else if (payload.expire <= Date.now()) {
        return done(new Error("TokenExpired"), null);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  });
  // Passport JWT Strategy triggered by validateJWTWithPassportJWT
  //https://www.npmjs.com/package/passport-jwt
  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
  };
}
