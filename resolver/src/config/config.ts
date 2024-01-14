import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/suriya";
