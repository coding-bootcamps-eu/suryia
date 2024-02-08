import App from "./app";
import linkRoutes from "./routes/linkRoutes";

const app = new App([linkRoutes]);

app
  .initializeDB()
  .then(() => {
    app.listen();
  })
  .catch((error) => {
    console.error("Failed to initialize the application:", error);
    process.exit(1);
  });
