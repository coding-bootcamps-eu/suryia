import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server runnig on http://127.0.0.1:8080/");
});
