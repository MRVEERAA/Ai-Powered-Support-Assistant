import express from "express";
import { listSessions } from "../controllers/sessionController.js";

const router = express.Router();

// GET /api/sessions
router.get("/", listSessions);

export default router;
