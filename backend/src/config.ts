import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: parseInt(process.env.PORT || "8080", 10),
  API_VERSION: process.env.API_VERSION || "1.5.5",
  PASSPORT_SECRET: process.env.PASSPORT_SECRET || "defaultnodeauthsecret",
  jwtSecret: process.env.JWT_SECRET || "defaultJWTSecret",
  jwtSession: { session: false },
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/suriya",
};

export default config;
