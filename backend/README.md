# Backend API Documentation

## Overview

Express.js backend with TypeScript, PostgreSQL database, Prisma ORM, and Gemini AI integration.

## Quick Start

```bash
cd backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env and add GEMINI_API_KEY and DATABASE_URL

# Initialize database
npm run init-db

# Start development
npm run dev
```

Server runs at `http://localhost:5000`

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Express app setup
│   ├── routes/
│   │   ├── health.ts         # Health check endpoint
│   │   └── lyrics.ts         # Lyrics endpoints
│   ├── services/
│   │   ├── database.ts       # Prisma client
│   │   └── geminiService.ts  # Gemini API
│   ├── middleware/           # Express middleware
│   ├── controllers/          # Route handlers
│   └── utils/               # Utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration files
├── scripts/
│   ├── healthCheck.ts       # Startup verification
│   └── initDb.ts            # Database setup
├── tests/
│   ├── database.test.ts     # Database tests
│   └── gemini.test.ts       # Gemini service tests
└── package.json
```

## API Endpoints

### Health Check

**GET** `/api/health`

Check if backend is running.

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-04T09:00:00Z"
}
```

### Generate Lyrics

**POST** `/api/lyrics/generate`

Generate lyrics using Gemini AI and save to database.

```bash
curl -X POST http://localhost:5000/api/lyrics/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Generate lyrics about love",
    "userId": 1
  }'
```

Request:
```json
{
  "prompt": "string (required) - The prompt for AI",
  "userId": "number (optional) - User ID to associate lyrics"
}
```

Response:
```json
{
  "id": 1,
  "lyrics": "Generated lyric content...",
  "savedAt": "2025-12-04T09:00:00Z"
}
```

### Get Lyrics

**GET** `/api/lyrics/:id`

Fetch a specific lyrics entry.

```bash
curl http://localhost:5000/api/lyrics/1
```

Response:
```json
{
  "id": 1,
  "prompt": "Generate lyrics about love",
  "content": "Lyric content...",
  "userId": 1,
  "createdAt": "2025-12-04T09:00:00Z",
  "updatedAt": "2025-12-04T09:00:00Z",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Get User Lyrics

**GET** `/api/lyrics/user/:userId`

Fetch all lyrics for a specific user.

```bash
curl http://localhost:5000/api/lyrics/user/1
```

Response:
```json
[
  {
    "id": 1,
    "prompt": "Prompt 1",
    "content": "Content 1...",
    "userId": 1,
    "createdAt": "2025-12-04T09:00:00Z",
    "updatedAt": "2025-12-04T09:00:00Z"
  }
]
```

## Environment Variables

Create `.env` file:

```
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/da_neighborhood
```

## Scripts

### Development

```bash
npm run dev
```

Starts dev server with hot reload. Includes:
- Health checks
- Database migrations
- TypeScript compilation
- File watching

### Build

```bash
npm run build
```

Compiles TypeScript to JavaScript in `dist/`

### Production Start

```bash
npm start
```

Starts built application. Includes:
- Health checks
- Database migrations

### Testing

```bash
npm run test           # Watch mode
npm run test:run      # Single run
```

### Health Checks

```bash
npm run health-check
```

Verifies:
- ✅ Environment variables
- ✅ Dependencies
- ✅ Database connection
- ✅ Database schema (auto-fixes if needed)

### Database Initialization

```bash
npm run init-db
```

- Generates Prisma client
- Runs pending migrations

### Database Management

```bash
npm run prisma:migrate    # Create migration
npm run prisma:generate   # Generate Prisma client
npm run prisma:studio     # Open Prisma Studio UI
```

## Database

### Schema

Two main tables:

**Users**
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lyrics    Lyrics[]
}
```

**Lyrics**
```prisma
model Lyrics {
  id        Int      @id @default(autoincrement())
  prompt    String
  content   String   @db.Text
  userId    Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
}
```

## Services

### Gemini Service

```typescript
import { generateLyrics } from "@/services/geminiService";

const lyrics = await generateLyrics("Generate sad lyrics");
// Returns: string
```

### Database Service

```typescript
import prisma from "@/services/database";

// Access any model
await prisma.user.findMany();
await prisma.lyrics.create({...});
```

## Testing

```bash
npm run test           # Watch mode
npm run test:run      # Single run
```

Tests database connection, schema, CRUD operations, and Gemini service.

## Troubleshooting

See [Troubleshooting Guide](../docs/TROUBLESHOOTING.md) for:
- Database connection issues
- Environment variable setup
- Port conflicts
- Dependency problems
- Docker issues

## Resources

- [Express Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Google Generative AI](https://ai.google.dev/)

