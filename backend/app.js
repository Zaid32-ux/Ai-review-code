import express from "express";
import { config } from "dotenv";
import  dbConnection  from "./database/dbConnection.js";
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/auth.routes.js"

config({ path: "./.env" });
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);

 dbConnection();
export default app;