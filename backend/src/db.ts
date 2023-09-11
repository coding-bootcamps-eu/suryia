import mongoose, { ConnectOptions, startSession } from "mongoose";
import { PORT, MONGODB_URI, API_VERSION } from "./config";
import { Status } from "./models/Status";

const connectToDB = async () => {
  try {
    const instance = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB");

    const status = new Status({ db: true, version: "1.0.0" });
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
