import mongoose, { Document } from "mongoose";

interface StatusDocument extends Document {
  db: boolean;
}

const StatusSchema = new mongoose.Schema({
  db: Boolean,
});

export const Status = mongoose.model<StatusDocument>("Status", StatusSchema);
