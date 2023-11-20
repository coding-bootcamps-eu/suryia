import express from "express";
import Links from "../models/Link";

const router = express.Router();

// GET-Route zum Abrufen aller Links

router.get("/", async (req, res) => {
  try {
    const links = await Links.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
