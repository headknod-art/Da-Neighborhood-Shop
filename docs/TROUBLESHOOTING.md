# Troubleshooting Guide

## Quick Diagnostics

First, run the health check:
```bash
cd backend
npm run health-check
```

This will identify the most common issues.

## Common Issues & Solutions

### 1. Database Connection Issues

#### Error: "could not connect to server"
```
Error: getaddrinfo ENOTFOUND postgres
```

**Solutions:**

**Docker Environment:**
```bash
# Check if containers are running
docker-compose ps

# Restart database
docker-compose restart postgres

# View database logs
docker-compose logs postgres

# Nuclear option: reset everything
docker-compose down -v
docker-compose up --build
```

**Local Development:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Create database if missing
createdb da_neighborhood
```

#### Error: "relation 'users' does not exist"
```
Error: PrismaClientKnownRequestError: 
The table 'public.users' does not exist in the current database.
```

**Solutions:**

**Backend will auto-fix on startup**, but if manual fix is needed:
```bash
cd backend

# Run migrations
npm run prisma:migrate

# Or deploy existing migrations
npx prisma migrate deploy

# View current schema
npm run prisma:studio
```

### 2. Environment Variables

#### Error: "GEMINI_API_KEY is not set"
```
Error: GEMINI_API_KEY is not set
```

**Solution:**
```bash
# Create .env files
cp .env.example .env
cp backend/.env.example backend/.env

# Edit both files and add your Gemini API key
# Get one at: https://aistudio.google.com
```

#### Error: "DATABASE_URL is not set"
```
Error: DATABASE_URL is not set
```

**Solution:**
```bash
# In backend/.env, add:
DATABASE_URL=postgresql://user:password@localhost:5432/da_neighborhood

# For Docker, this is already set in docker-compose.yml
```

### 3. Port Already in Use

#### Error: "Port 3000 already in use"
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Kill the process:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

**Or use a different port:**
```bash
# Frontend (.env)
echo "PORT=3001" >> .env

# Restart
npm run dev
```

**Docker cleanup:**
```bash
docker-compose down
docker ps -a  # View all containers
docker rm <container-id>
```

### 4. Dependencies Issues

#### Error: "Cannot find module 'react'"
```
Error: Cannot find module 'react'
```

**Solution:**
```bash
# Reinstall all dependencies
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Prisma Client is not generated"
```
Error: Prisma Client needs to be generated...
```

**Solution:**
```bash
cd backend
npm run prisma:generate
```

### 5. Docker Issues

#### Error: "Docker daemon is not running"
```
Cannot connect to the Docker daemon
```

**Solution:**
```bash
# Linux
sudo systemctl start docker

# Mac
open /Applications/Docker.app

# Windows
# Start Docker Desktop from Start menu
```

#### Error: "Build context too large"
```
Error: failed to solve with frontend dockerfile.v0
```

**Solution:**
```bash
# Clean up and rebuild
docker-compose down -v
rm -rf node_modules backend/node_modules
docker system prune -a
docker-compose up --build
```

#### Error: "Volumes not cleaning up"
```
$ docker-compose down
ERROR: Volume postgres_data has mount points
```

**Solution:**
```bash
# Force remove with volume deletion
docker-compose down -v

# Or manually remove volume
docker volume ls
docker volume rm da-neighborhood-shop_postgres_data
```

### 6. TypeScript Errors

#### Error: "Cannot find type definition"
```
error TS2688: Cannot find type definition file
```

**Solution:**
```bash
# Reinstall type definitions
npm install --save-dev @types/node @types/react @types/react-dom

# For backend
cd backend
npm install --save-dev @types/express @types/cors @types/node
```

#### Error: "Property not found"
```
error TS2339: Property 'x' does not exist on type 'y'
```

**Solution:**
```bash
# Verify tsconfig.json is correct
npm run build

# Check for type errors
npx tsc --noEmit
```

### 7. Test Failures

#### Error: "Tests fail with module not found"
```
Error: Cannot find module '../src/index'
```

**Solution:**
```bash
cd backend
npm run test -- --clearCache

# Rebuild and retry
npm run build
npm run test:run
```

#### Error: "Database test fails: connection refused"
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**

For Docker:
```bash
docker-compose exec postgres psql -U user -d da_neighborhood -c "SELECT 1"
```

For local:
```bash
# Ensure PostgreSQL is running
psql -U user -d da_neighborhood -c "SELECT 1"
```

### 8. Git/Husky Issues

#### Error: "husky - pre-commit hook failed"
```
husky - pre-commit hook failed
```

**Solution:**
```bash
# The tests failed, fix them first
npm run test:run

# Then commit again
git add .
git commit -m "Your message"

# Force commit if needed (not recommended)
git commit --no-verify -m "Your message"
```

#### Error: "Unable to set up husky"
```
command not found: husky
```

**Solution:**
```bash
npm install -D husky
npx husky install
```

### 9. API Connection Issues

#### Error: "Frontend can't connect to backend"
```
Error: Failed to fetch from http://localhost:5000
```

**Solution:**

**Check backend is running:**
```bash
curl http://localhost:5000/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

**Check CORS:**
Backend has CORS enabled, but verify:
```bash
# In backend/src/index.ts
app.use(cors());  // Should be present
```

**Docker network:**
```bash
# Make sure services can reach each other
docker-compose exec frontend curl http://backend:5000/api/health
```

### 10. Performance Issues

#### Issue: "App is very slow"

**Check resource usage:**
```bash
# Docker
docker stats

# Local
top  # or Activity Monitor on Mac
```

**Solutions:**
```bash
# Clear Docker caches
docker system prune -a

# Rebuild from scratch
docker-compose down -v
docker-compose up --build

# Check database query performance
cd backend
npm run prisma:studio
```

## Advanced Debugging

### Enable Debug Logging

**Backend:**
```bash
DEBUG=* npm run dev
```

**Frontend:**
```bash
# In browser console
localStorage.debug = '*'
```

### Check Logs

**Docker:**
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend -f  # Follow logs
docker-compose logs postgres -f
```

**Local:**
```bash
# Check Node processes
ps aux | grep node

# View system logs
# Mac
log stream --process node

# Linux
journalctl -u postgres
```

### Database Inspection

```bash
cd backend

# Open Prisma Studio (GUI)
npm run prisma:studio

# Or use psql
psql -U user -d da_neighborhood -c "SELECT * FROM users;"
```

### Network Debugging

```bash
# Check if ports are listening
netstat -tuln | grep -E '3000|5000|5432'

# Test connectivity
curl -v http://localhost:5000/api/health
curl -v http://localhost:3000

# Check DNS resolution
nslookup postgres  # From docker container
```

## Still Having Issues?

1. **Check the logs** - Most errors are in the logs
2. **Run health checks** - `cd backend && npm run health-check`
3. **Review this guide** - Search for your error message
4. **Check GitHub issues** - Similar issues might be solved
5. **Create an issue** - Include logs and error messages

## Recovery Steps

### Full Reset (Nuclear Option)

```bash
# Stop everything
docker-compose down -v
pkill -f "node"

# Clean up
rm -rf node_modules backend/node_modules
rm package-lock.json backend/package-lock.json
rm -rf dist backend/dist

# Reinstall
npm install
cd backend && npm install && cd ..

# Reset environment
rm .env backend/.env
cp .env.example .env
cp backend/.env.example backend/.env

# Add your API key
# Then restart
./start.sh
```

### Selective Reset

```bash
# Just database
docker-compose down postgres
docker volume rm da-neighborhood-shop_postgres_data
docker-compose up postgres -d

# Just backend
docker-compose down backend
npm --prefix backend install
docker-compose up backend -d

# Just frontend
rm -rf node_modules dist
npm install
npm run dev
```

## Performance Optimization

### Frontend
```bash
# Build optimization
npm run build

# Check bundle size
npx vite-bundle-visualizer

# Enable React profiling
# In browser DevTools: React tab -> Profiler
```

### Backend
```bash
# Enable query logging
# In backend/.env
DATABASE_DEBUG=true

# Profile with
npm run build
NODE_OPTIONS="--inspect" npm start
# Then visit chrome://inspect
```

## Documentation Links

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Vitest Docs](https://vitest.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Docker Docs](https://docs.docker.com/)
