import { Request, Response } from "express";
import passportLocalMongoose from "passport-local-mongoose";
import { UserModel } from "../models/Users";
import jwt from "jwt-simple";
import { config } from "../config";
import mongoose from "mongoose";
import { Status } from "../models/Status";
import { API_VERSION } from "../config";

export default {
  login: async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById({
        username: req.body.username,
      });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "Invalid user" });
      }

      const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };

      const token = jwt.encode(payload, config.jwtSecret);

      res.json({ token: token });
    } catch (err) {
      console.error("Fehler", err);
      res.status(500).json({ error: "Invalid process" });
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const newUser = new UserModel({
        username: email,
        password: password,
      });
      await UserModel.register(newUser, password);
      res.json({ message: "Successful registration!" });
    } catch (err) {
      console.error("Invalid registration", err);
      res.status(500).json({ error: "Invalid registration" });
    }
  },
  getStatus: async (req: Request, res: Response) => {
    try {
      const secretToken = req.query.secret_token as string;
      if (!secretToken) {
        return res.status(400).json({ error: "Unauthorized" });
      }
      const dbStatus = mongoose.connection.readyState === 1;
      const status = await Status.findOne({});

      console.log("Status saved successfully");
      res.json({
        message: "Status retrieved successfully",
        status: {
          db: dbStatus,
        },
        api_version: API_VERSION,
        user: req.user,
        token: secretToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
