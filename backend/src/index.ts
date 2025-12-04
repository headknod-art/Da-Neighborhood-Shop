import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./services/database.js";
import healthRoutes from "./routes/health.js";
import lyricsRoutes from "./routes/lyrics.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/lyrics", lyricsRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Da Neighborhood Shop API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      lyrics: "/api/lyrics/generate"
    }
  });
});

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  server.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  server.close();
  await prisma.$disconnect();
  process.exit(0);
});
