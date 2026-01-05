import express from "express";
import routes from "./routes.js";

const server = express();
server.use(express.json());

server.use(routes);

/*  SERVER  */

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

export default server;
