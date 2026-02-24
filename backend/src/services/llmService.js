import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateAIResponse({
  docsContent,
  chatHistory,
  userMessage,
}) {
  try {
    const systemPrompt = `
You are an AI support assistant.

RULES:
1. Answer ONLY using the provided documentation.
2. If the answer is not found in the docs, reply EXACTLY:
   "Sorry, I don’t have information about that."
3. Do NOT make up information.
4. Keep answers short and clear.
`;

    const prompt = `
DOCUMENTATION:
${docsContent}

RECENT CONVERSATION:
${chatHistory}

USER QUESTION:
${userMessage}
`;

    const result = await model.generateContent(systemPrompt + "\n\n" + prompt);

    const reply = result.response.text().trim();

    return {
      reply,
      tokensUsed: result.response.usageMetadata?.totalTokenCount || 0,
    };
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      reply: "Sorry, I couldn't process your request right now.",
      tokensUsed: 0,
    };
  }
}
