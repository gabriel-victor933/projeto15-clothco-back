import router from "./routes/index.route.js";
import express from "express";
import cors from "cors";
const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(5000, () => {
  console.log("http://localhost:5000");
});
