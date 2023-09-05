import mongoose, { Document, Schema } from "mongoose";

interface StatusDocument extends Document {
  db: Boolean;
}

const StatusSchema = new mongoose.Schema({
  db: { type: Boolean, required: true },
});

export const Status = mongoose.model<StatusDocument>("Status", StatusSchema);
