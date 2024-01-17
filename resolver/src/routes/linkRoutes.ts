import express from "express";
import Link from "../models/Link";

const router = express.Router();
router.get("/:path", async (req, res) => {
  try {
    const path = req.params.path;
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
