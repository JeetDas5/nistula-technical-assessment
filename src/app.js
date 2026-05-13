import "dotenv/config";
import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello! Welcome to Nistula.");
});

app.use("/webhook", messageRoutes);

export default app;
