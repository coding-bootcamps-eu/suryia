import express from "express";
import Link from "../models/Link";

const router = express.Router();

router.get("*", async (req, res) => {
  try {
    const path =
      req.originalUrl[0] === "/" ? req.originalUrl.slice(1) : req.originalUrl;
    const link = await Link.findOne({ path: path });

    if (link) {
      res.redirect(link.url);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});
export default router;
