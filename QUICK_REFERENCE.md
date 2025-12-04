# Quick Reference Card

Fast lookup for common commands and patterns.

## 🚀 Getting Started

```bash
# Clone and setup
git clone <repo>
cd Da-Neighborhood-Shop

# Quick start (Docker)
cp .env.example .env && cp backend/.env.example backend/.env
# Edit .env files, add GEMINI_API_KEY
./start.sh

# Or manual start
npm install && cd backend && npm install && cd ..
cd backend && npm run init-db
# Terminal 1: npm run dev
# Terminal 2: cd backend && npm run dev
```

## 📦 Package Management

```bash
# Install dependencies
npm install                    # Frontend
cd backend && npm install      # Backend

# Add package
npm install package-name       # Frontend
cd backend && npm install pkg  # Backend

# Update packages
npm update                      # Frontend
cd backend && npm update        # Backend

# Check outdated
npm outdated
cd backend && npm outdated
```

## 🔧 Development Commands

```bash
# Frontend
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview build
npm run test          # Run tests (watch)
npm run test:run      # Run tests (once)
npm run test:ui       # Interactive test UI

# Backend
cd backend
npm run dev           # Start with health checks
npm run build         # Build for production
npm run start         # Production server
npm run test          # Run tests (watch)
npm run test:run      # Run tests (once)
npm run health-check  # System verification
npm run init-db       # Initialize database

# Database
npm run prisma:migrate    # Create migration
npm run prisma:generate   # Generate client
npm run prisma:studio     # Open GUI
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose up --build           # Build and start
docker-compose up                   # Just start
docker-compose up -d                # Start in background

# Stop services
docker-compose down                 # Stop all
docker-compose down -v              # Stop and remove volumes

# View status
docker-compose ps                   # List containers
docker-compose logs -f              # Follow logs
docker-compose logs -f backend      # Backend logs
docker-compose logs -f postgres     # Database logs

# Restart specific service
docker-compose restart backend
docker-compose restart postgres

# Execute in container
docker-compose exec backend npm run health-check
docker-compose exec postgres psql -U user -d da_neighborhood
```

## 📝 Environment Variables

### Frontend (.env)
```
GEMINI_API_KEY=your_api_key_here
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@postgres:5432/da_neighborhood
```

## 🧪 Testing

```bash
# Frontend tests
npm run test                # Watch mode
npm run test:run          # Single run
npm run test:ui           # Interactive UI

# Backend tests
cd backend
npm run test              # Watch mode
npm run test:run         # Single run

# Health checks
cd backend
npm run health-check

# Check code
npm run build             # TypeScript check
```

## 🗄️ Database

```bash
cd backend

# Prisma Studio (GUI)
npm run prisma:studio
# Open http://localhost:5555

# Create migration
npm run prisma:migrate
# Follow prompts

# View migrations
ls prisma/migrations/

# Reset database (CAREFUL!)
npx prisma migrate reset

# Query database directly
psql -U user -d da_neighborhood
# Then: SELECT * FROM users;

# Backup
pg_dump da_neighborhood > backup.sql
psql da_neighborhood < backup.sql
```

## 🔍 Troubleshooting Quick Fixes

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Kill process on port
lsof -i :3000    # Find PID
kill -9 <PID>    # Kill it

# Reset Docker
docker-compose down -v
docker system prune -a
docker-compose up --build

# Check health
cd backend && npm run health-check

# View logs
docker-compose logs -f
docker logs <container-id>
```

## 📚 API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Generate lyrics
curl -X POST http://localhost:5000/api/lyrics/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Lyrics about love","userId":1}'

# Get lyrics
curl http://localhost:5000/api/lyrics/1

# Get user lyrics
curl http://localhost:5000/api/lyrics/user/1
```

## 🔐 Git & Commits

```bash
# Status
git status

# Add changes
git add .
git add <file>

# Commit (runs tests automatically)
git commit -m "Your message"

# Force commit (skip tests)
git commit --no-verify -m "Your message"

# Push
git push origin main

# View history
git log --oneline -n 10
```

## 📂 File Locations

```
Frontend entry:        src/index.tsx
Frontend app:          src/App.tsx
Frontend components:   src/components/
Frontend tests:        tests/
Frontend styles:       src/index.css

Backend entry:         backend/src/index.ts
Backend routes:        backend/src/routes/
Backend services:      backend/src/services/
Backend database:      backend/prisma/schema.prisma
Backend tests:         backend/tests/

Docker config:         docker-compose.yml
Environment:           .env, backend/.env
Documentation:         docs/, *.md files
```

## 🎨 React Patterns

```typescript
// Component
import { FC } from "react";

interface Props { title: string; }

const Component: FC<Props> = ({ title }) => {
  return <div>{title}</div>;
};

export default Component;

// State
const [value, setValue] = useState("");

// Effect
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, [dependency]);

// Conditional
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}

// List
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```

## 🎯 Tailwind Classes

```html
<!-- Flexbox -->
<div class="flex items-center justify-between">

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">

<!-- Text -->
<p class="text-lg font-bold text-blue-500">

<!-- Spacing -->
<div class="p-4 m-2 mb-8">

<!-- Colors -->
<div class="bg-blue-500 text-white hover:bg-blue-600">

<!-- Responsive -->
<div class="md:p-8 lg:p-12">
```

## 📊 Prisma Query Examples

```typescript
import prisma from "@/services/database";

// Create
const user = await prisma.user.create({
  data: { email: "user@example.com", name: "User" }
});

// Read
const user = await prisma.user.findUnique({ where: { id: 1 } });
const users = await prisma.user.findMany();

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: "New Name" }
});

// Delete
await prisma.user.delete({ where: { id: 1 } });

// With relations
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { lyrics: true }
});

// Filter & order
const lyrics = await prisma.lyrics.findMany({
  where: { userId: 1 },
  orderBy: { createdAt: "desc" },
  take: 10
});
```

## 🚀 Deployment Quick Steps

```bash
# Build
npm run build
cd backend && npm run build

# Environment setup
export NODE_ENV=production
export GEMINI_API_KEY=your_key
export DATABASE_URL=postgresql://...

# Start
cd backend && npm start  # Backend
npm start                # Frontend preview

# Docker push (example)
docker build -t my-app .
docker push my-registry/my-app:latest

# Deploy
# Follow cloud provider docs (Heroku, Vercel, AWS, etc.)
```

## 🔗 Documentation Links

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Project overview |
| [docs/INDEX.md](./docs/INDEX.md) | Documentation index |
| [docs/SETUP.md](./docs/SETUP.md) | Setup & deployment |
| [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | Problem solving |
| [docs/FRONTEND.md](./docs/FRONTEND.md) | Frontend guide |
| [docs/COMPONENTS.md](./docs/COMPONENTS.md) | Component patterns |
| [backend/README.md](./backend/README.md) | Backend API |
| [TESTING.md](./TESTING.md) | Testing guide |

## 💡 Tips & Tricks

- Hot reload enabled in dev (changes auto-refresh)
- TypeScript errors shown in terminal
- Tests run in watch mode by default
- Pre-commit hooks run tests automatically
- Prisma Studio GUI easier than SQL queries
- Use `npm run health-check` when things break
- Check `docker-compose logs` when Docker fails
- Use `.env.example` as template

## ⚡ Performance

- Use `React.memo` for expensive components
- Use `useMemo` for computed values
- Use `useCallback` for stable callbacks
- Lazy load with `React.lazy()`
- Optimize images
- Use Tailwind's `@apply` for repeated styles

---

**Quick Tip:** When stuck, run `cd backend && npm run health-check` to diagnose issues!
