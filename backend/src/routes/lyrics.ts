import { Router, Request, Response } from "express";
import { generateLyrics } from "../services/geminiService.js";
import prisma from "../services/database.js";

const router = Router();

router.post("/generate", async (req: Request, res: Response) => {
  try {
    const { prompt, userId } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const lyrics = await generateLyrics(prompt);
    
    // Save to database
    const savedLyrics = await prisma.lyrics.create({
      data: {
        prompt,
        content: lyrics,
        userId: userId || null,
      },
    });

    res.json({ 
      id: savedLyrics.id,
      lyrics,
      savedAt: savedLyrics.createdAt
    });
  } catch (error) {
    console.error("Error in lyrics endpoint:", error);
    res.status(500).json({ error: "Failed to generate lyrics" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const lyric = await prisma.lyrics.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });

    if (!lyric) {
      res.status(404).json({ error: "Lyrics not found" });
      return;
    }

    res.json(lyric);
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).json({ error: "Failed to fetch lyrics" });
  }
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const lyrics = await prisma.lyrics.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: "desc" },
    });

    res.json(lyrics);
  } catch (error) {
    console.error("Error fetching user lyrics:", error);
    res.status(500).json({ error: "Failed to fetch lyrics" });
  }
});

export default router;
