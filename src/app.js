import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { messageRoutes } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/webhook", messageRoutes);

export default app;
