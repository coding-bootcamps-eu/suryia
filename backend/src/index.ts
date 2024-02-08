import App from "./server";
import userRoutes from "./routes/userRoutes";
import statusRoutes from "./routes/statusRoutes";
import linkRoutes from "./routes/linkRoutes";

const app = new App([userRoutes, statusRoutes, linkRoutes]);

app
  .initializeDB()
  .then(() => {
    app.listen();
  })
  .catch((error) => {
    console.error("Failed to initialize the application:", error);
    process.exit(1);
  });
