# Testing & Troubleshooting Guide

## 📋 Recent Changes & Fixes Log

### December 6, 2025 - Test Suite & Frontend Fixes

#### Frontend Configuration
- ✅ **Added missing script tag to index.html**
  - Issue: React app was not mounting, showing only black screen
  - Fix: Added `<script type="module" src="/index.tsx"></script>` to body
  - Why: Vite requires explicit module import to mount React components
  - Impact: Frontend now properly renders LoginSplash component

#### Startup Script Enhancements
- ✅ **Added frontend configuration verification**
  - Automatically detects missing script tag in index.html
  - Auto-adds the tag using sed if missing
  - Provides clear feedback during startup process
  - File: `start.sh` (lines 85-103)

- ✅ **Added frontend readiness check**
  - Waits up to 10 attempts for frontend to respond on http://localhost:3000
  - Prevents premature service URL display before frontend is ready
  - Graceful error handling if frontend takes longer to start

#### Test Suite Fixes
- ✅ **Fixed Navbar component test import**
  - Changed from default import to named import: `import { Navbar }`
  - Issue: Navbar was being exported as named export, not default export
  - Fix: Updated `tests/Navbar.test.tsx` with correct import syntax
  
- ✅ **Added required props to Navbar tests**
  - Navbar component requires `onCartClick` and `cartCount` props
  - Added mock callback function for tests: `mockCartClick = () => {}`
  - Both tests now pass required props to render method

- ✅ **Installed missing test dependencies**
  - Added: `@testing-library/react`
  - Added: `@testing-library/jest-dom`
  - Added: `jsdom` (for DOM simulation)
  - These are required for React component testing with Vitest

#### Current Test Status ✅
```
✅ App.test.tsx (2 tests passing)
✅ Navbar.test.tsx (2 tests passing)
📊 Total: 4/4 tests passing (100% pass rate)
```

#### Files Modified
- `index.html` - Added script module tag for React app entry point
- `start.sh` - Added configuration verification and frontend health checks
- `tests/Navbar.test.tsx` - Fixed imports and added required props
- `tests/App.test.tsx` - Now passing with correct setup
- `TROUBLESHOOTING.md` - This changelog

---

## Quick Start

### Using the Startup Script (Recommended)
```bash
chmod +x start.sh
./start.sh
```

The startup script automatically:
- ✅ Verifies Docker is running
- ✅ Creates environment files if missing
- ✅ Checks and installs dependencies
- ✅ **Verifies frontend configuration** (NEW)
- ✅ Cleans up old containers
- ✅ Builds and starts all services
- ✅ Waits for database to be healthy
- ✅ Waits for backend API to respond
- ✅ **Waits for frontend to be ready** (NEW)
- ✅ Displays service URLs and live logs

### Manual Startup
```bash
# Start all services
docker-compose up --build -d

# View logs
docker-compose logs -f
```

## Testing

### Frontend Tests
```bash
npm run test              # Watch mode
npm run test:run         # Single run
```

**Test Files:**
- `tests/App.test.tsx` - Main app component rendering
- `tests/Navbar.test.tsx` - Navigation component functionality

### Backend Tests
```bash
cd backend
npm run test             # Watch mode
npm run test:run        # Single run
```

## Health Checks

The backend runs automatic health checks on startup:

```bash
cd backend
npm run health-check     # Run manually
```

This checks:
- ✅ Environment variables (DATABASE_URL required, GEMINI_API_KEY optional)
- ✅ Dependencies (package.json exists)
- ✅ Database connection
- ✅ Database accessibility (auto-attempts migrations if needed)

## Troubleshooting

### Startup Script Issues

**Error: "start.sh: Permission denied"**
```bash
chmod +x start.sh
./start.sh
```

**Error: "Docker is not running"**
```bash
# On Linux
sudo systemctl start docker

# On Mac/Windows - Start Docker Desktop application
```

**Script exits with "Health check failed"**
```bash
# Check what failed
docker-compose logs backend --tail=50

# Common fixes:
# 1. Missing DATABASE_URL
echo "DATABASE_URL=postgresql://user:password@postgres:5432/da_neighborhood" > backend/.env

# 2. Database not ready
docker-compose restart postgres
sleep 10
docker-compose restart backend
```

### Database Issues

**Error: "could not connect to server at postgres:5432"**
```bash
# Check if PostgreSQL container is running
docker-compose ps

# Check database health
docker-compose logs postgres

# Restart database
docker-compose restart postgres

# Wait for it to be healthy
docker-compose ps | grep postgres
```

**Error: "relation does not exist" or "table 'users' not found"**
```bash
# Option 1: Let health check auto-fix
docker-compose restart backend

# Option 2: Run migrations manually inside container
docker-compose exec backend npx prisma migrate deploy

# Option 3: Create initial migration
docker-compose exec backend npx prisma migrate dev --name init
```

**Error: "Prisma Client could not locate the Query Engine for runtime linux-musl"**
```bash
# The schema already has the correct binary targets
# Regenerate Prisma client
cd backend
npm run prisma:generate

# Rebuild backend container
docker-compose build --no-cache backend
docker-compose restart backend
```

### Environment Variable Issues

**Warning: "Missing optional: GEMINI_API_KEY"**
This is optional for development. To add:
```bash
# Edit .env files
nano .env
nano backend/.env

# Add your key
GEMINI_API_KEY=your_actual_key_here

# Restart services
docker-compose restart backend frontend
```

**Error: "Missing required: DATABASE_URL"**
```bash
# Create backend .env if missing
cat > backend/.env << EOF
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=
DATABASE_URL=postgresql://user:password@postgres:5432/da_neighborhood
EOF

# Restart backend
docker-compose restart backend
```

### Dependency Issues

**Error: "Cannot find module '@prisma/client'"**
```bash
# Reinstall backend dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma
npm run prisma:generate

# Restart
docker-compose restart backend
```

**Error: "Cannot find module" in frontend**
```bash
# Reinstall frontend dependencies
rm -rf node_modules package-lock.json
npm install

# Restart frontend
docker-compose restart frontend
```

**Error: "ERESOLVE unable to resolve dependency tree"**
```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Restart the service
docker-compose restart frontend
```

### Tailwind CSS / PostCSS Issues

**Error: "tailwindcss directly as a PostCSS plugin"**
```bash
# Ensure using Tailwind 3.x (not 4.x)
npm install tailwindcss@3.4.18 --save-exact

# Remove Tailwind 4 packages
npm uninstall @tailwindcss/postcss

# Verify postcss.config.js uses simple config:
# {
#   plugins: {
#     tailwindcss: {},
#     autoprefixer: {},
#   },
# }

# Restart frontend
docker-compose restart frontend
```

**PostCSS errors after package changes**
```bash
# Clean install
rm -rf node_modules/tailwindcss node_modules/.cache
npm install

# Rebuild frontend Docker container
docker-compose build --no-cache frontend
docker-compose restart frontend
```

### Docker Issues

**Error: "Port already in use"**
```bash
# Find what's using the port
lsof -i :3000  # frontend
lsof -i :5000  # backend
lsof -i :5432  # database

# Kill the process
kill -9 <PID>

# Or stop Docker containers
docker-compose down
```

**Error: "No space left on device"**
```bash
# Clean up Docker
docker system prune -a --volumes

# Remove unused images
docker image prune -a

# Remove stopped containers
docker container prune
```

**Containers keep restarting or unhealthy**
```bash
# Check logs for the failing service
docker-compose logs backend --tail=100
docker-compose logs frontend --tail=100

# Check container status
docker-compose ps

# Try complete rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Volume and Cache Issues

**Changes not reflecting in container**
```bash
# For code changes, restart is enough
docker-compose restart frontend

# For dependency changes, rebuild
docker-compose down
docker-compose up --build -d
```

**Old node_modules causing issues**
```bash
# Remove mounted volumes
docker-compose down
rm -rf node_modules backend/node_modules

# Reinstall locally
npm install
cd backend && npm install && cd ..

# Restart containers
docker-compose up -d
```

**Docker using cached layers**
```bash
# Build without cache
docker-compose build --no-cache

# Or for specific service
docker-compose build --no-cache backend
docker-compose restart backend
```

## Pre-commit Hooks

Git hooks run tests automatically before commits:

```bash
# Initialize hooks (if not done)
npx husky install

# Run tests manually
npm run test:run

# Bypass hooks (not recommended)
git commit --no-verify
```

## CI/CD Pipeline

GitHub Actions automatically runs tests on:
- Every push to `main` or `develop`
- Every pull request

Files:
- `.github/workflows/tests.yml` - Test workflow configuration

## Complete Environment Reset

When all else fails:

```bash
# 1. Stop everything and remove volumes
docker-compose down -v

# 2. Remove all local dependencies
rm -rf node_modules backend/node_modules
rm -f package-lock.json backend/package-lock.json

# 3. Clean Docker
docker system prune -f

# 4. Reinstall dependencies locally
npm install
cd backend && npm install && cd ..

# 5. Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d

# 6. Monitor startup
docker-compose logs -f
```

## Service URLs

Once running successfully:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Database**: localhost:5432 (credentials in .env)

## Useful Commands

### Docker Commands
```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend

# Check status
docker-compose ps

# Restart service
docker-compose restart backend

# Stop all
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Execute command in container
docker-compose exec backend sh
docker-compose exec backend npm run prisma:studio
```

### Development Commands
```bash
# Backend
cd backend
npm run dev              # Start dev server
npm run test            # Run tests
npm run prisma:studio   # Open Prisma Studio
npm run prisma:migrate  # Run migrations
npm run health-check    # Check system health

# Frontend
npm run dev             # Start dev server
npm run build           # Production build
npm run test           # Run tests
```

## Issue: Frontend Shows Black Screen / React Not Rendering

**Symptoms:**
- Frontend returns HTTP 200 but displays only a black screen
- No React components rendering
- No JavaScript errors in console
- Page HTML loads but React app doesn't mount

**Root Cause:**
The `index.html` file is missing the module script tag that loads the React application entry point (`index.tsx`). Vite requires this script tag to inject the React app into the DOM.

**Solution:**

1. **Add the script tag to index.html:**
```html
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
```

2. **Verify the fix:**
```bash
# Check if index.tsx is being served
curl -s http://localhost:3000/index.tsx | head -20

# Should see transformed JavaScript, not an error
```

3. **Restart the frontend container:**
```bash
docker-compose restart frontend
```

**Why This Happens:**
- Vite dev server expects `index.html` to explicitly import the application entry point
- Without this script tag, the HTML loads but React never initializes
- The `<div id="root">` remains empty, showing only the black background

**Verification Steps:**
1. Open http://localhost:3000 in browser
2. Open DevTools Console (F12)
3. Should see no errors
4. Should see React DevTools icon if installed
5. Page should display the LoginSplash component (black background with centered login form)

**Related Issues:**
- If you see a 500 error instead, check Tailwind CSS configuration
- If login form is invisible but present, check CSS is loading correctly

---

## Issue: Frontend Shows Black Screen / React Not Rendering

**Symptoms:**
- Frontend returns HTTP 200 but displays only a black screen
- No React components rendering
- No JavaScript errors in console
- Page HTML loads but React app doesn't mount

**Root Cause:**
The `index.html` file is missing the module script tag that loads the React application entry point (`index.tsx`). Vite requires this script tag to inject the React app into the DOM.

**Solution:**

1. **Add the script tag to index.html:**
```html
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
```

2. **Verify the fix:**
```bash
# Check if index.tsx is being served
curl -s http://localhost:3000/index.tsx | head -20

# Should see transformed JavaScript, not an error
```

3. **Restart the frontend container:**
```bash
docker-compose restart frontend
```

**Why This Happens:**
- Vite dev server expects `index.html` to explicitly import the application entry point
- Without this script tag, the HTML loads but React never initializes
- The `<div id="root">` remains empty, showing only the black background

**Verification Steps:**
1. Open http://localhost:3000 in browser
2. Open DevTools Console (F12)
3. Should see no errors
4. Should see React DevTools icon if installed
5. Page should display the LoginSplash component (black background with centered login form)

**Related Issues:**
- If you see a 500 error instead, check Tailwind CSS configuration
- If login form is invisible but present, check CSS is loading correctly

---

## Issue: Frontend Shows Black Screen / React Not Rendering

**Symptoms:**
- Frontend returns HTTP 200 but displays only a black screen
- No React components rendering
- No JavaScript errors in console
- Page HTML loads but React app doesn't mount

**Root Cause:**
The `index.html` file is missing the module script tag that loads the React application entry point (`index.tsx`). Vite requires this script tag to inject the React app into the DOM.

**Solution:**

1. **Add the script tag to index.html:**
```html
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
```

2. **Verify the fix:**
```bash
# Check if index.tsx is being served
curl -s http://localhost:3000/index.tsx | head -20

# Should see transformed JavaScript, not an error
```

3. **Restart the frontend container:**
```bash
docker-compose restart frontend
```

**Why This Happens:**
- Vite dev server expects `index.html` to explicitly import the application entry point
- Without this script tag, the HTML loads but React never initializes
- The `<div id="root">` remains empty, showing only the black background

**Verification Steps:**
1. Open http://localhost:3000 in browser
2. Open DevTools Console (F12)
3. Should see no errors
4. Should see React DevTools icon if installed
5. Page should display the LoginSplash component (black background with centered login form)

**Related Issues:**
- If you see a 500 error instead, check Tailwind CSS configuration
- If login form is invisible but present, check CSS is loading correctly

**Automated Fix:**
The startup script (`start.sh`) now automatically checks for this issue and adds the script tag if missing.

---

## Common Issues Summary

| Issue | Quick Fix |
|-------|-----------|
| Permission denied on start.sh | `chmod +x start.sh` |
| Docker not running | Start Docker Desktop |
| Port in use | `docker-compose down` then restart |
| Database connection fails | `docker-compose restart postgres` |
| Prisma errors | `cd backend && npm run prisma:generate` |
| Missing env vars | Copy .env.example files |
| Old dependencies | Remove node_modules and reinstall |
| Tailwind errors | Install tailwindcss@3.4.18 |
| Black screen on frontend | Add `<script type="module" src="/index.tsx"></script>` to index.html |
| Changes not showing | `docker-compose restart <service>` |
| Complete failure | Follow "Complete Environment Reset" |

## Getting Help

If issues persist:
1. Check logs: `docker-compose logs -f`
2. Verify env files exist: `ls -la .env backend/.env`
3. Check Docker: `docker-compose ps`
4. Review this guide's troubleshooting section
5. Try complete reset procedure
