import router from "./routes/index.route.js";
import express from "express";
import cors from "cors";
const server = express();

server.use(express.json());
server.use(cors());
server.use(router);


server.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
