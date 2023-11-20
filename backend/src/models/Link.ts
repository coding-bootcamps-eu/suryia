import mongoose, { Document, Schema } from "mongoose";

const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

export interface Link extends Document {
  url: string;
  path: string;
  slug: string;
  created: Date;
  modified: Date;
}

const linkSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    slug: { type: String, slug: "path", unique: true },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "modified" },
  }
);

const Links = mongoose.model<Link>("Link", linkSchema);

export default Links;
