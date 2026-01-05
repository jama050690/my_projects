import express from "express";
import mahsulotRoutes from "./mahsulot_routers.js";

const server = express();
server.use(express.json());

server.use("/api/mahsulotlar", mahsulotRoutes);

/*  SERVER  */

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
