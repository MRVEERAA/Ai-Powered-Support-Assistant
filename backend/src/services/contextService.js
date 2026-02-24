import { getRecentMessages } from "../models/messageModel.js";

const HISTORY_LIMIT = 10;

export async function buildChatHistory(sessionId) {
  try {
    const history = await getRecentMessages(sessionId, HISTORY_LIMIT);

    return history
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n");
  } catch (error) {
    throw new Error("Failed to build chat history");
  }
}
