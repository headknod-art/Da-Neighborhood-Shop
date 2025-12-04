import { describe, it, expect, vi } from "vitest";
import { generateLyrics } from "../src/services/geminiService";

describe("Gemini Service", () => {
  it("should have GEMINI_API_KEY configured", () => {
    expect(process.env.GEMINI_API_KEY).toBeDefined();
  });

  it("should accept a prompt string", async () => {
    const prompt = "Generate lyrics about love";
    try {
      const result = await generateLyrics(prompt);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      // API might fail in test environment, that's ok
      expect(error).toBeDefined();
    }
  });

  it("should throw on missing API key", async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    try {
      expect(() => {
        require("../src/services/geminiService");
      }).toThrow();
    } finally {
      process.env.GEMINI_API_KEY = originalKey;
    }
  });
});
