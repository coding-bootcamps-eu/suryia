import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  id: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const UserModel = mongoose.model("User", UserSchema);
