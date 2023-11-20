import express from "express";
import Links from "../models/Link";
import passport from "passport";

const router = express.Router();

// GET-Route zum Abrufen aller Links
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const links = await Links.find();
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// POST-Route zum Erstellen eines neuen Links
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const link = new Links(req.body);
      const newLink = await link.save();
      res.status(201).json(newLink);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
export default router;
