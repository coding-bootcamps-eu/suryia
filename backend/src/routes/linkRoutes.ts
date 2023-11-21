import express from "express";
import Link from "../models/Link";
import passport from "passport";
import linkController from "../controller/linkController";
const router = express.Router();

// GET-Route zum Abrufen aller Links
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  linkController.getAllLinks
);

// POST-Route zum Erstellen eines neuen Links
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  linkController.createLink
);

router.post("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});
router.get("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});
router.put("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});
router.delete("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});
export default router;
