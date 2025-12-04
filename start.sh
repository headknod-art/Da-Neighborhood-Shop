#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Exit on error
set -e

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║    🚀 Da Neighborhood Shop - Development Environment 🚀    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is running
echo -e "${BLUE}🔍 Checking Docker daemon...${NC}"
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Check if .env files exist
echo -e "${BLUE}📝 Setting up environment files...${NC}"

if [ ! -f ".env" ]; then
  echo -e "${YELLOW}⚠️  .env not found, creating from .env.example...${NC}"
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env created${NC}"
  else
    echo -e "${YELLOW}⚠️  .env.example not found, creating minimal .env${NC}"
    echo "GEMINI_API_KEY=" > .env
  fi
else
  echo -e "${GREEN}✅ .env file exists${NC}"
fi

if [ ! -f "backend/.env" ]; then
  echo -e "${YELLOW}⚠️  backend/.env not found, creating from .env.example...${NC}"
  if [ -f "backend/.env.example" ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ backend/.env created${NC}"
  else
    echo -e "${YELLOW}⚠️  backend/.env.example not found, creating minimal .env${NC}"
    mkdir -p backend
    cat > backend/.env << EOF
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=
DATABASE_URL=postgresql://user:password@postgres:5432/da_neighborhood
EOF
  fi
else
  echo -e "${GREEN}✅ backend/.env file exists${NC}"
fi

echo ""
echo -e "${BLUE}📦 Checking dependencies...${NC}"

# Check frontend node_modules
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⚠️  Installing frontend dependencies (this may take a moment)...${NC}"
  npm install --legacy-peer-deps
  echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
  echo -e "${GREEN}✅ Frontend node_modules exists${NC}"
fi

# Check backend node_modules
if [ ! -d "backend/node_modules" ]; then
  echo -e "${YELLOW}⚠️  Installing backend dependencies (this may take a moment)...${NC}"
  cd backend && npm install && cd ..
  echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
  echo -e "${GREEN}✅ Backend node_modules exists${NC}"
fi

echo -e "${GREEN}✅ All dependencies ready${NC}"
echo ""

# Clean up old containers if they exist
echo -e "${BLUE}🧹 Cleaning up any existing containers...${NC}"
docker-compose down --remove-orphans 2>/dev/null || true
echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Start docker-compose
echo -e "${BLUE}🐳 Building and starting Docker containers...${NC}"
echo -e "${YELLOW}This may take a few minutes on first startup...${NC}"
echo ""

docker-compose up --build -d

# Wait for services to be ready
echo ""
echo -e "${BLUE}⏳ Waiting for services to start...${NC}"

# Wait for database to be healthy
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
  if docker-compose exec -T postgres pg_isready -U user > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database is ready${NC}"
    break
  fi
  attempt=$((attempt + 1))
  echo -e "${YELLOW}⏳ Database starting... ($attempt/$max_attempts)${NC}"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo -e "${RED}❌ Database failed to start${NC}"
  docker-compose logs postgres
  exit 1
fi

# Wait for backend to be ready
attempt=0
while [ $attempt -lt $max_attempts ]; do
  if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend API is ready${NC}"
    break
  fi
  attempt=$((attempt + 1))
  echo -e "${YELLOW}⏳ Backend starting... ($attempt/$max_attempts)${NC}"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo -e "${RED}⚠️  Backend is taking longer than expected${NC}"
  echo -e "${YELLOW}This is okay - it may still be initializing${NC}"
fi

echo ""
echo -e "${GREEN}✅ All services started successfully!${NC}"
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                     📍 Service URLs 📍                       ║${NC}"
echo -e "${BLUE}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║  Frontend:  ${GREEN}http://localhost:3000${BLUE}                             ║${NC}"
echo -e "${BLUE}║  Backend:   ${GREEN}http://localhost:5000${BLUE}                             ║${NC}"
echo -e "${BLUE}║  Database:  ${GREEN}localhost:5432${BLUE} (user/password)                  ║${NC}"
echo -e "${BLUE}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║                    🛠️  Useful Commands 🛠️                     ║${NC}"
echo -e "${BLUE}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║  View logs:     ${YELLOW}docker-compose logs -f${BLUE}                  ║${NC}"
echo -e "${BLUE}║  Stop services: ${YELLOW}docker-compose down${BLUE}                       ║${NC}"
echo -e "${BLUE}║  DB studio:     ${YELLOW}cd backend && npm run prisma:studio${BLUE}        ║${NC}"
echo -e "${BLUE}║  Run tests:     ${YELLOW}npm run test${BLUE}                               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}💡 Tip: Press Ctrl+C to stop viewing logs and return to the terminal${NC}"
echo ""

# Follow logs
docker-compose logs -f
