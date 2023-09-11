import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || "8080", 10);
export const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/suriya";
export const API_VERSION: string = process.env.API_VERSION || "1.5.5";
