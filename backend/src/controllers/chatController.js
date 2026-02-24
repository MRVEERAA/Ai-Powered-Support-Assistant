import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  updateSessionTimestamp,
} from "../models/sessionModel.js";
import { saveMessage } from "../models/messageModel.js";
import { findRelevantDocs } from "../services/documentService.js";
import { buildChatHistory } from "../services/contextService.js";
import { generateAIResponse } from "../services/llmService.js";

export async function chatHandler(req, res, next) {
  try {
    let { sessionId, message } = req.body;

    if (!sessionId) {
      sessionId = uuidv4();
    }

    await createSession(sessionId);

    // Save user message
    await saveMessage(sessionId, "user", message);

    // Get relevant docs
    const relevantDocs = await findRelevantDocs(message);

    // STRICT RULE: If no docs → no LLM call
    if (!relevantDocs.length) {
      const fallback = "Sorry, I don’t have information about that.";

      await saveMessage(sessionId, "assistant", fallback);
      await updateSessionTimestamp(sessionId);

      return res.json({
        sessionId,
        reply: fallback,
        tokensUsed: 0,
      });
    }

    const docsContent = relevantDocs
      .map((doc) => `${doc.title}: ${doc.content}`)
      .join("\n");

    const chatHistory = await buildChatHistory(sessionId);

    const { reply, tokensUsed } = await generateAIResponse({
      docsContent,
      chatHistory,
      userMessage: message,
    });

    await saveMessage(sessionId, "assistant", reply);
    await updateSessionTimestamp(sessionId);

    res.json({
      sessionId,
      reply,
      tokensUsed,
    });
  } catch (error) {
    next(error);
  }
}
