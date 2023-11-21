import { Request, Response } from "express";
import Link from "../models/Link";

export default {
  // GET-Route zum Abrufen aller Links
  getAllLinks: async (req: Request, res: Response) => {
    try {
      const links = await Link.find();
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST-Route zum Erstellen eines neuen Links
  createLink: async (req: Request, res: Response) => {
    try {
      const link = new Link(req.body);
      const newLink = await link.save();
      console.log(newLink);
      res.status(201).json(newLink);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
