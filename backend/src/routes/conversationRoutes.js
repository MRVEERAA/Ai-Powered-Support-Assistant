import express from "express";
import { getConversation } from "../controllers/conversationController.js";

const router = express.Router();

// GET /api/conversations/:sessionId
router.get("/:sessionId", getConversation);

export default router;
