import db from "../config/db.js";

export const saveMessage = (sessionId, role, content) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO messages (session_id, role, content)
      VALUES (?, ?, ?)
    `;

    db.run(query, [sessionId, role, content], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

export const getConversationBySession = (sessionId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT role, content, created_at
       FROM messages
       WHERE session_id = ?
       ORDER BY created_at ASC`,
      [sessionId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};

export const getRecentMessages = (sessionId, limit = 10) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT role, content
       FROM messages
       WHERE session_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
      [sessionId, limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows.reverse()); // return chronological order
      },
    );
  });
};
