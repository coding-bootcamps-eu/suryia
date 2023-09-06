import mongoose, { Document, Schema } from "mongoose";

const StatusSchema = new mongoose.Schema({
  db: { type: Boolean, required: true },
});

export const Status = mongoose.model("Status", StatusSchema);
