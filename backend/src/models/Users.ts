import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", UserSchema);
