import express from "express";
import { chatHandler } from "../controllers/chatController.js";
import { validateChatRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// POST /api/chat
router.post("/", validateChatRequest, chatHandler);

export default router;
