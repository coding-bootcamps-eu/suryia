import express from "express";
import passport from "passport";
import accountController from "../controller/accountController";

const router = express.Router();
router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  accountController.getStatus
);

export default router;
