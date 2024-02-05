import mongoose from "mongoose";
import config from "./config";
import { Status } from "./models/Status";

const connectToDB = async () => {
  try {
    const instance = await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to MongoDB");

    const status = new Status({ db: true, version: config.API_VERSION });
    await Status.createCollection();

    const session = await instance.startSession();
    session.startTransaction();
    await status.save();
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default connectToDB;
