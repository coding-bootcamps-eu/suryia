import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
  path: string;
  url: string;
}

const linkSchema = new Schema<ILink>({
  path: { type: String, required: true, unique: true },
  url: { type: String, required: true },
});

const Link = mongoose.model<ILink>("Link", linkSchema);

export default Link;
