import mongoose, { Document, Schema } from "mongoose";
export interface Link extends Document {
  url: string;
  path: string;
  created: Date;
  modified: Date;
}

const linkSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    //slug: { type: String, slug: "path", unique: true },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "modified" },
  }
);

const Link = mongoose.model<Link>("Link", linkSchema);

export default Link;
