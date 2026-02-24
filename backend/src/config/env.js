import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["GEMINI_API_KEY"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const config = {
  port: process.env.PORT || 5000,
  geminiKey: process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || "development",
};
