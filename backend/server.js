import app from "./src/app.js";
import { config } from "./src/config/env.js";
import { initializeDatabase } from "./src/config/db.js";
import { logger } from "./src/utils/logger.js";

// Initialize SQLite tables
initializeDatabase();

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
