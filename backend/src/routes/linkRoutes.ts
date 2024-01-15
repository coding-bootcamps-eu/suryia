import express from "express";
import passport from "passport";
import linkController from "../controller/linkController";

const router = express.Router();

// GET-Route zum Abrufen aller Links
router.get(
  "/link",
  passport.authenticate("jwt", { session: false }),
  linkController.getAllLinks
);

// POST-Route zum Erstellen eines neuen Links
router.post(
  "/link",
  passport.authenticate("jwt", { session: false }),
  linkController.createLink
);

// GET-Route zum Abrufen eines einzelnen Links
router.get(
  "/link/:id",
  passport.authenticate("jwt", { session: false }),
  linkController.getLink
);

// DELETE-Route zum Löschen eines Links
router.delete(
  "/link/:id",
  passport.authenticate("jwt", { session: false }),
  linkController.deleteLink
);

// PUT-Route zum Aktualisieren eines Links
router.put(
  "/link/:id",
  passport.authenticate("jwt", { session: false }),
  linkController.updateLink
);

// Test Routen
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
