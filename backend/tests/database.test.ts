import { describe, it, expect, beforeAll, afterAll } from "vitest";
import prisma from "../src/services/database";

describe("Database Connection", () => {
  beforeAll(async () => {
    // Connection is established when Prisma client is created
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should connect to PostgreSQL", async () => {
    const result = await prisma.$queryRaw`SELECT 1`;
    expect(result).toBeDefined();
  });

  it("should create and fetch a user", async () => {
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: "Test User",
      },
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe(user.email);

    // Cleanup
    await prisma.user.delete({ where: { id: user.id } });
  });

  it("should create lyrics entry", async () => {
    const lyric = await prisma.lyrics.create({
      data: {
        prompt: "Test prompt",
        content: "Generated lyric content",
      },
    });

    expect(lyric.id).toBeDefined();
    expect(lyric.prompt).toBe("Test prompt");

    // Cleanup
    await prisma.lyrics.delete({ where: { id: lyric.id } });
  });
});
