import { Request, Response } from "express";
import Link from "../models/Link";

export default {
  // GET-Route zum Abrufen aller Links
  getAllLinks: async (req: Request, res: Response) => {
    try {
      const links = await Link.find();
      console.log(links);
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

  // DELETE-Route zum Löschen eines Links
  deleteLink: async (req: Request, res: Response) => {
    console.log(req.params);
    try {
      const { id } = req.params;
      const link = await Link.findByIdAndDelete(id);

      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
      res.status(200).json({ message: "Link deleted succesfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // PUT-Route zum Aktualisieren eines Links
  updateLink: async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const { id } = req.params;
      const link = await Link.findByIdAndUpdate(id, req.body, { new: true });
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
      res.status(200).json({ message: "Link updated succesfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
