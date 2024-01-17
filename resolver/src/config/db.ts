import mongoose, { ConnectOptions } from "mongoose";
import { MONGODB_URI } from "./config";

const connectToDB = async () => {
  try {
    const instance = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default connectToDB;
