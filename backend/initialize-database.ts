import mongoose from "mongoose";
import { UserModel } from "../backend/src/models/Users";
import Link from "../backend/src/models/Link";
import bcrypt from "bcrypt";

const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/testdatabase";

async function initializeDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log("Connect with DB.");

  const hashedPassword = await bcrypt.hash("password1234", 10);

  const userExists = await UserModel.findOne({
    username: "julia12345@test.com",
  });
  if (!userExists) {
    console.log("User doesn't exist. Creat new user.");

    await UserModel.create({
      username: "julia12345@test.com",
      password: "password1234",
    });
  } else {
    console.log("User already exist!");
  }

  const linkExist = await Link.findOne({
    url: "https://example.com",
    path: "example-path",
  });
  if (!linkExist) {
    console.log("Link doesn't exist. Creat new link.");
    await Link.create({ url: "https://example.com", path: "example-path" });
  } else {
    console.log("Link already exist!");
  }
  console.log("Database initialization completed.");
  await mongoose.disconnect();
}

initializeDatabase().catch((error) => {
  console.error("Error during database initialization:", error);
});
