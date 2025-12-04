import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.stubGlobal("process", {
  env: {
    GEMINI_API_KEY: "test-key",
  },
});
