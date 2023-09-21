import { Request, Response } from "express";
import passportLocalMongoose from "passport-local-mongoose";
import { UserModel } from "../models/Users";
import jwt from "jwt-simple";
import { config } from "../config";

export default{
   login : async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden" });
    }

    const payload = {
      id: user.id,
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    const token = jwt.encode(payload, config.jwtSecret);

    res.json({ token: token });
  } catch (err) {
    console.error("Fehler", err);
    res.status(500).json({ error: "Ein Fehler ist aufgetreten" });
  }
};
register : async (req: Request, res: Response) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
    });
    await UserModel.register(newUser, req.body.password);
    res.json({ message: "Successful registration!" });
  } catch (err) {
    console.error("Invalid registration", err);
    res.status(500).json({ error: "Invalid registration" });
  }
};

}