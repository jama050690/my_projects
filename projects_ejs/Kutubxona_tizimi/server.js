import express from "express";
import kitobRoutes from "./kitob_routes.js";

const server = express();

server.use(express.json());

// ROUTES
server.use("/api/kitoblar", kitobRoutes);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
