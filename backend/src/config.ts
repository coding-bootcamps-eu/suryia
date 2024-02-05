import dotenv from "dotenv";

dotenv.config({});

const baseConfig = {
  PORT: parseInt(process.env.PORT || "8080", 10),
  API_VERSION: process.env.API_VERSION || "1.5.5",
  PASSPORT_SECRET: "nodeauthsecret",
  jwtSecret: "JWT Secret",
  jwtSession: { session: false },
};
let envConfig;
switch (process.env.PROD_ENV) {
  case "prod":
    envConfig = {
      MONGODB_URI: process.env.MONGODB_URI_PROD,
    };
    break;
  default:
    envConfig = {
      MONGODB_URI:
        process.env.MONGODB_URI || "mongodb://localhost:27017/suriya",
    };
}

const config = { ...baseConfig, ...envConfig };

export default config;
