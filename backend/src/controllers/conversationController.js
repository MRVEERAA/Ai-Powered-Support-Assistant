import { getConversationBySession } from "../models/messageModel.js";

export async function getConversation(req, res, next) {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        error: "sessionId is required",
      });
    }

    const conversation = await getConversationBySession(sessionId);

    res.json(conversation);
  } catch (error) {
    next(error);
  }
}
