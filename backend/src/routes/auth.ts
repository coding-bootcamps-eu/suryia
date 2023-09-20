import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: string, user: string) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Anmeldung fehlgeschlagen" });
    }
    // Anmeldung erfolgreich
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.json({ message: "Anmeldung erfolgreich" });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/login");
    }
  });
});

export default router;
