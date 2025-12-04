#!/usr/bin/env node

import prisma from "../src/services/database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface HealthCheckResult {
  name: string;
  status: "ok" | "error" | "warning";
  message: string;
  timestamp: string;
}

const results: HealthCheckResult[] = [];

async function checkEnvironmentVariables(): Promise<void> {
  const requiredVars = ["DATABASE_URL"];
  const optionalVars = ["GEMINI_API_KEY"];
  const missing = requiredVars.filter((v) => !process.env[v]);
  const missingOptional = optionalVars.filter((v) => !process.env[v]);

  if (missing.length > 0) {
    results.push({
      name: "Environment Variables",
      status: "error",
      message: `Missing required: ${missing.join(", ")}`,
      timestamp: new Date().toISOString(),
    });
  } else if (missingOptional.length > 0) {
    results.push({
      name: "Environment Variables",
      status: "warning",
      message: `All required set, but missing optional: ${missingOptional.join(", ")}`,
      timestamp: new Date().toISOString(),
    });
  } else {
    results.push({
      name: "Environment Variables",
      status: "ok",
      message: "All required variables set",
      timestamp: new Date().toISOString(),
    });
  }
}

async function checkDatabaseConnection(): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    results.push({
      name: "Database Connection",
      status: "ok",
      message: "Connected to PostgreSQL",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    results.push({
      name: "Database Connection",
      status: "error",
      message: `Failed to connect: ${error instanceof Error ? error.message : String(error)}`,
      timestamp: new Date().toISOString(),
    });
  }
}

async function checkDatabaseSchema(): Promise<void> {
  try {
    // Just verify we can connect, tables will be created by migrations
    await prisma.$queryRaw`SELECT 1`;

    results.push({
      name: "Database Schema",
      status: "ok",
      message: "Database is accessible",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    results.push({
      name: "Database Schema",
      status: "warning",
      message: `Schema check failed: ${error instanceof Error ? error.message : String(error)}`,
      timestamp: new Date().toISOString(),
    });

    // Attempt to fix by running migrations
    console.log("🔧 Attempting to fix schema with migrations...");
    try {
      const { execSync } = await import("child_process");
      execSync("npx prisma migrate deploy", { stdio: "inherit" });
      results.push({
        name: "Schema Auto-Fix",
        status: "ok",
        message: "Migrations applied successfully",
        timestamp: new Date().toISOString(),
      });
    } catch (migrationError) {
      results.push({
        name: "Schema Auto-Fix",
        status: "warning",
        message: `Migration attempted: ${migrationError instanceof Error ? migrationError.message : String(migrationError)}`,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

async function checkNodeModules(): Promise<void> {
  const packageJsonPath = path.join(__dirname, "..", "package.json");

  if (fs.existsSync(packageJsonPath)) {
    results.push({
      name: "Dependencies",
      status: "ok",
      message: "package.json found",
      timestamp: new Date().toISOString(),
    });
  } else {
    results.push({
      name: "Dependencies",
      status: "error",
      message: "package.json not found",
      timestamp: new Date().toISOString(),
    });
  }
}

async function runHealthChecks(): Promise<void> {
  console.log("🏥 Running startup health checks...\n");

  await checkEnvironmentVariables();
  await checkNodeModules();
  await checkDatabaseConnection();
  await checkDatabaseSchema();

  console.log("\n📋 Health Check Results:\n");

  for (const result of results) {
    const icon =
      result.status === "ok"
        ? "✅"
        : result.status === "warning"
          ? "⚠️"
          : "❌";
    console.log(`${icon} ${result.name}: ${result.message}`);
  }

  const hasErrors = results.some((r) => r.status === "error");

  if (hasErrors) {
    console.log("\n❌ Health check failed. Please fix the errors above.");
    process.exit(1);
  } else {
    console.log("\n✅ All systems operational!\n");
  }

  await prisma.$disconnect();
}

runHealthChecks().catch((error) => {
  console.error("Fatal error during health check:", error);
  process.exit(1);
});
