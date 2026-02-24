import { getAllSessions } from "../models/sessionModel.js";

export async function listSessions(req, res, next) {
  try {
    const sessions = await getAllSessions();
    res.json(sessions);
  } catch (error) {
    next(error);
  }
}
