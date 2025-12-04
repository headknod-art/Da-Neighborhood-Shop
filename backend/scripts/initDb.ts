#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.join(__dirname, "..");

console.log("🚀 Initializing database migrations...\n");

try {
  console.log("📝 Generating Prisma client...");
  execSync("npx prisma generate", {
    cwd: backendDir,
    stdio: "inherit",
  });

  console.log("\n🔄 Running pending migrations...");
  execSync("npx prisma migrate deploy", {
    cwd: backendDir,
    stdio: "inherit",
  });

  console.log("\n✅ Database initialized successfully!\n");
} catch (error) {
  console.error("\n❌ Failed to initialize database");
  console.error(error);
  process.exit(1);
}
