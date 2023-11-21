import express from "express";
import passport from "passport";
import accountController from "../controller/accountController";

const router = express.Router();

router.post("/login", passport.authenticate("local"), accountController.login);

router.post("/register", accountController.register);

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    res.json({
      message: "User successfully logout!",
    });
  });
});

export default router;
