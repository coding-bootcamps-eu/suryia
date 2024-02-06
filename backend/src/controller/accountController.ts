import { Request, Response } from "express";
import { UserModel } from "../models/Users";
import jwt from "jwt-simple";
import config from "../config";
import mongoose from "mongoose";
import { Status } from "../models/Status";

export default {
  login: async (req: Request, res: Response) => {
    try {
      console.log(req.body.username);
      const user = await UserModel.findOne({ username: req.body.username });
      if (!user) return res.status(404).json({ error: "User not found" });

      // Überprüfe das Passwort
      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid password" });

      const payload = { id: user.id, expire: Date.now() + 1000 * 60 * 60 * 2 };
      const token = jwt.encode(payload, config.jwtSecret);
      res.json({ token: token });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }
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
      console.log(req.headers);
      const secretToken = req.headers.authorization as string;
      if (!secretToken) {
        return res.status(401).json({ error: "Unauthorized: Missing Token" });
      }

      const dbStatus = mongoose.connection.readyState === 1;
      const status = await Status.findOne({});

      if (!status) return res.status(404).json({ error: "Status not found" });
      const { username, _id } = req.user as { username: string; _id: string };
      res.json({
        message: "Status retrieved successfully",
        status: { db: dbStatus },
        api_version: config.API_VERSION,
        user: {
          username,
          id: _id,
        },
        token: secretToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
