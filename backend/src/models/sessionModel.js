import db from "../config/db.js";

export const createSession = (sessionId) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT OR IGNORE INTO sessions (id)
      VALUES (?)
    `;

    db.run(query, [sessionId], function (err) {
      if (err) reject(err);
      else resolve({ id: sessionId });
    });
  });
};

export const getSessionById = (sessionId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM sessions WHERE id = ?`, [sessionId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const updateSessionTimestamp = (sessionId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE sessions
       SET updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [sessionId],
      (err) => {
        if (err) reject(err);
        else resolve(true);
      },
    );
  });
};

export const getAllSessions = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, updated_at
       FROM sessions
       ORDER BY updated_at DESC`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};
