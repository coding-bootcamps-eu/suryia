import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/login");
    }
  });
});

export default router;
