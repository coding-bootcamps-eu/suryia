import { Request, Response } from "express";
import passportLocalMongoose from "passport-local-mongoose";
import { UserModel } from "../models/Users";
import jwt from "jwt-simple";
import { config } from "../config";

export default {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({
        email: email,
        password: password,
      });

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
        //username: req.body.email,
        //password: req.body.password,
      });
      console.log("register");
      await UserModel.register(newUser, "password");
      res.json({ message: "Successful registration!" });
    } catch (err) {
      console.error("Invalid registration", err);
      res.status(500).json({ error: "Invalid registration" });
    }
  },
};
