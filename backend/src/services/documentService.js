import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsPath = path.join(__dirname, "../../data/docs.json");

let cachedDocs = null;

export async function loadDocuments() {
  if (cachedDocs) return cachedDocs;

  try {
    const data = await fs.readFile(docsPath, "utf-8");
    cachedDocs = JSON.parse(data);
    return cachedDocs;
  } catch (error) {
    console.error("Error loading documents:", error);
    return [];
  }
}

export async function findRelevantDocs(userQuestion) {
  const docs = await loadDocuments();

  const lowerQuestion = userQuestion.toLowerCase();

  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuestion) ||
      doc.content.toLowerCase().includes(lowerQuestion),
  );
}
