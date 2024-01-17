import App from "./app";
import linkRoutes from "./routes/linkRoutes";

const app = new App([linkRoutes]);

app.listen();
