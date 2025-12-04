# Setup & Deployment Guide

## Initial Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (optional)
- PostgreSQL 16+ (if running locally)
- Gemini API Key

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd Da-Neighborhood-Shop
```

### Step 2: Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### Step 3: Set Environment Variables

```bash
# Frontend
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
```

Edit both `.env` files and add your `GEMINI_API_KEY`:

```
GEMINI_API_KEY=your_api_key_here
```

Get your key at: https://aistudio.google.com

### Step 4: Set Up Database

#### With Docker (Recommended)

```bash
docker-compose up postgres -d
```

#### Local PostgreSQL

```bash
# Create database
createdb da_neighborhood

# Update backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/da_neighborhood
```

### Step 5: Initialize Backend

```bash
cd backend
npm run init-db
cd ..
```

This will:
- Generate Prisma client
- Run migrations
- Create tables

### Step 6: Start Development

#### Option A: Docker (All Services)

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:5432

#### Option B: Local Development

Terminal 1 - Frontend:
```bash
npm run dev
# Frontend: http://localhost:3000
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
# Backend: http://localhost:5000
```

## Startup Script

Use the provided startup script for automated setup:

```bash
chmod +x start.sh
./start.sh
```

This will:
- Check for environment files
- Create from examples if missing
- Install dependencies if needed
- Start Docker Compose

## Configuration

### Frontend Configuration

Edit `vite.config.ts` for custom settings:

```typescript
export default defineConfig({
  server: {
    port: 3000,      // Change port here
    host: "0.0.0.0"  // Allow external connections
  },
  // ... other config
});
```

### Backend Configuration

Edit `backend/src/index.ts`:

```typescript
const PORT = process.env.PORT || 5000;
app.use(cors());  // Configure CORS
```

### Database Configuration

Edit `backend/prisma/schema.prisma` to modify schema:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  // Add more fields here
}
```

Then run migrations:
```bash
cd backend
npm run prisma:migrate
```

## Building for Production

### Frontend Build

```bash
npm run build
```

Output in `dist/`:
```bash
# Preview production build
npm run preview

# Serve with HTTP server
npx serve dist
```

### Backend Build

```bash
cd backend
npm run build
```

Output in `backend/dist/`:
```bash
# Start production server
NODE_ENV=production npm start
```

## Deployment

### Docker Deployment

#### Build Images

```bash
# Frontend
docker build -t da-neighborhood-frontend .

# Backend
docker build -t da-neighborhood-backend ./backend
```

#### Run Containers

```bash
# Start all services
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Cloud Deployment

#### Heroku

```bash
# Install Heroku CLI
curl https://cli.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create da-neighborhood-shop

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key
heroku config:set DATABASE_URL=postgresql://...

# Deploy
git push heroku main
```

#### Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### AWS

```bash
# Using AWS CLI
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name your-key-pair

# Then SSH and setup manually or use automation
```

#### Google Cloud

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash

# Initialize
gcloud init

# Deploy to Cloud Run
gcloud run deploy da-neighborhood-backend \
  --source . \
  --platform managed \
  --region us-central1
```

#### DigitalOcean

```bash
# Install doctl CLI
cd ~
wget https://github.com/digitalocean/doctl/releases/download/v1.111.3/doctl-1.111.3-linux-x64.tar.gz
tar xf ~/doctl-1.111.3-linux-x64.tar.gz

# Create droplet
doctl compute droplet create da-neighborhood \
  --region sfo2 \
  --image ubuntu-24-04-x64 \
  --size s-1vcpu-1gb
```

## Continuous Deployment

### GitHub Actions

Workflow defined in `.github/workflows/tests.yml`

On every push to `main`:
1. Run tests
2. Build project
3. (Optional) Deploy

To add deployment:

```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: |
    # Your deployment command here
```

### Environment Variables for CI/CD

```bash
# GitHub Secrets
GEMINI_API_KEY=your_key
DATABASE_URL=postgresql://...
```

Add in: Settings → Secrets and variables → Actions

## Monitoring

### Application Monitoring

```bash
# View resource usage
docker stats

# Check logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Database Monitoring

```bash
cd backend

# Open Prisma Studio
npm run prisma:studio
# Visit http://localhost:5555

# Or use psql
psql -U user -d da_neighborhood -c "SELECT * FROM users;"
```

### Error Tracking

Enable debug logging:

```bash
# Backend
DEBUG=* npm run dev

# Frontend (in browser console)
localStorage.debug = '*'
```

## Maintenance

### Database Backups

```bash
# Backup PostgreSQL
pg_dump da_neighborhood > backup.sql

# Restore from backup
psql da_neighborhood < backup.sql

# Docker backup
docker-compose exec postgres pg_dump -U user da_neighborhood > backup.sql
```

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update specific package
npm install package-name@latest

# For backend
cd backend && npm update && cd ..
```

### Database Migrations

```bash
cd backend

# Create new migration
npm run prisma:migrate

# View migrations
ls prisma/migrations/

# Rollback (careful!)
npx prisma migrate resolve --rolled-back <migration_name>
```

## Troubleshooting Deployment

### Common Issues

**Port already in use**
```bash
lsof -i :3000
kill -9 <PID>
```

**Database connection failed**
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

**Missing environment variables**
```bash
# Verify all required vars are set
printenv | grep GEMINI
printenv | grep DATABASE
```

**Build fails**
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Performance Optimization

### Frontend

```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Code split
const Component = lazy(() => import('./Component'));
```

### Backend

```bash
# Enable query optimization
DATABASE_DEBUG=true npm run dev

# Use pagination
GET /api/lyrics?skip=0&take=10

# Add caching
Cache-Control: public, max-age=300
```

### Database

```sql
-- Add indexes for faster queries
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_lyrics_userid ON lyrics(user_id);
```

## Security Checklist

- [ ] Environment variables set correctly
- [ ] No secrets in code or git history
- [ ] CORS configured appropriately
- [ ] Database backups enabled
- [ ] HTTPS enabled in production
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose internals
- [ ] Dependencies kept up to date

## Rollback Strategy

```bash
# If deployment fails, revert to previous version
git revert HEAD
git push origin main

# Or rollback Docker image
docker-compose down
docker image rm da-neighborhood-backend:latest
docker-compose up
```

## Resources

- [Docker Docs](https://docs.docker.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [React Production](https://react.dev/learn/production-grade-tools)
- [PostgreSQL Deployment](https://www.postgresql.org/docs/current/deployment.html)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)
