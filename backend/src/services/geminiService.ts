import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

let client: GoogleGenAI | null = null;

if (apiKey) {
  client = new GoogleGenAI({ apiKey });
}

export async function generateLyrics(prompt: string): Promise<string> {
  if (!client) {
    throw new Error("GEMINI_API_KEY is not configured. Please set it in .env");
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error generating lyrics:", error);
    throw new Error("Failed to generate lyrics");
  }
}
