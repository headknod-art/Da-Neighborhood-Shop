# Testing & Troubleshooting Guide

## Testing Overview

This project includes comprehensive testing at every level:
- **Unit Tests** - Individual functions and services
- **Integration Tests** - Database and API integration
- **Component Tests** - React components
- **Health Checks** - System startup verification

## Testing

### Frontend Tests
```bash
npm run test              # Watch mode
npm run test:run        # Single run
npm run test:ui         # Interactive UI
```

### Backend Tests
```bash
cd backend
npm run test            # Watch mode
npm run test:run       # Single run
```

## Health Checks

The backend runs automatic health checks on startup:

```bash
cd backend
npm run health-check    # Run manually
```

This checks:
- ✅ Environment variables
- ✅ Dependencies
- ✅ Database connection
- ✅ Database schema (auto-fixes with migrations if needed)

## Troubleshooting

### Database Issues

**Error: "could not connect to server"**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart containers
docker-compose restart postgres

# View logs
docker-compose logs postgres
```

**Error: "relation does not exist"**
The schema is out of sync. Backend will auto-fix on startup with:
```bash
cd backend
npm run init-db
```

Or manually:
```bash
cd backend
npm run prisma:migrate
```

### Missing Environment Variables

**Error: "GEMINI_API_KEY is not set"**
```bash
# Create .env files from examples
cp .env.example .env
cp backend/.env.example backend/.env

# Add your API keys to both files
```

### Dependencies Issues

**Error: "Cannot find module"**
```bash
# Clear and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

**Error: "Port already in use"**
```bash
# Kill process using the port
lsof -i :3000  # frontend
lsof -i :5000  # backend
lsof -i :5432  # database

kill -9 <PID>

# Or change ports in docker-compose.yml
```

**Error: "Docker daemon is not running"**
```bash
# Start Docker
docker daemon  # On Linux
# On Mac/Windows, start Docker Desktop
```

## Pre-commit Hooks

Tests run automatically before each commit:
```bash
# Runs frontend tests on staged files
npm run test:run

# Bypass hooks (not recommended)
git commit --no-verify
```

## CI/CD Pipeline

GitHub Actions runs tests on:
- Every push to `main` or `develop`
- Every pull request

View workflow status in `.github/workflows/tests.yml`

## Quick Start with Tests

```bash
# Using the startup script
chmod +x start.sh
./start.sh

# Manual startup with checks
cd backend && npm run health-check
npm run dev
cd backend && npm run dev
```
