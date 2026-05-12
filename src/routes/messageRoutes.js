import express from "express";
import { handleMessage } from "../controllers/messageController.js";
import { webhookRateLimiter, validateApiKey } from "../middlewares/index.js";

const router = express.Router();

router.post("/message", webhookRateLimiter, validateApiKey, handleMessage);

export default router;
