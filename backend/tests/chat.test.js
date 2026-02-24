import request from "supertest";
import app from "../src/app.js";

describe("POST /api/chat", () => {
  it("should return a reply", async () => {
    const res = await request(app).post("/api/chat").send({
      message: "How do I reset my password?",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBeDefined();
  });

  it("should return fallback for unknown question", async () => {
    const res = await request(app).post("/api/chat").send({
      message: "Tell me about Mars colony",
    });

    expect(res.body.reply).toBe("Sorry, I don’t have information about that.");
  });
});
