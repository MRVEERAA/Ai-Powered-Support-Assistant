import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

import { limiter } from "./config/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/conversations", conversationRoutes);

// Health check (nice bonus)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Global error handler
app.use(errorHandler);

export default app;
