# Documentation Index

Complete documentation for Da Neighborhood Shop project.

## 📚 Quick Links

### Getting Started
- **[README.md](./README.md)** - Project overview and quick start
- **[Setup Guide](./docs/SETUP.md)** - Detailed setup and deployment instructions
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

### Development
- **[Frontend Guide](./docs/FRONTEND.md)** - Frontend development and testing
- **[Backend Guide](./backend/README.md)** - Backend API and database
- **[Components Guide](./docs/COMPONENTS.md)** - React component documentation
- **[Testing Guide](./TESTING.md)** - Comprehensive testing guide

### Configuration
- **[Prisma Schema](./backend/prisma/schema.prisma)** - Database schema
- **[TypeScript Config](./tsconfig.json)** - Frontend TypeScript
- **[Backend TypeScript](./backend/tsconfig.json)** - Backend TypeScript
- **[Vite Config](./vite.config.ts)** - Frontend build config
- **[Tailwind Config](./tailwind.config.js)** - Styling configuration

## 🎯 Documentation by Role

### I'm a New Developer
1. Start here: [README.md](./README.md)
2. Setup: [Setup & Deployment](./docs/SETUP.md)
3. Frontend: [Frontend Guide](./docs/FRONTEND.md)
4. Backend: [Backend Guide](./backend/README.md)

### I'm Working on Frontend
- [Frontend Guide](./docs/FRONTEND.md) - Development & testing
- [Components Guide](./docs/COMPONENTS.md) - Component patterns
- [Testing Guide](./TESTING.md) - Frontend tests
- [Tailwind Docs](https://tailwindcss.com/docs) - Styling

### I'm Working on Backend
- [Backend Guide](./backend/README.md) - API & setup
- [Prisma Schema](./backend/prisma/schema.prisma) - Database
- [Testing Guide](./TESTING.md) - Backend tests
- [API Reference](#api-reference) - Endpoint documentation

### I'm Deploying
- [Setup & Deployment](./docs/SETUP.md) - Deployment options
- [Docker Setup](#docker) - Containerization
- [GitHub Actions](#ci-cd) - Automated testing

### I'm Troubleshooting
- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md) - Detailed solutions
- [Health Checks](#health-checks) - System verification
- [Testing Guide](./TESTING.md) - Test troubleshooting

## 📋 Common Tasks

### Getting Started

```bash
# Quick start with Docker
git clone <repo>
cd Da-Neighborhood-Shop
cp .env.example .env
cp backend/.env.example backend/.env
# Add GEMINI_API_KEY to .env files
./start.sh
```

### Running Tests

```bash
# Frontend tests
npm run test:run

# Backend tests
cd backend && npm run test:run

# Health checks
cd backend && npm run health-check
```

### Database Operations

```bash
# Open Prisma Studio
cd backend && npm run prisma:studio

# Create migration
cd backend && npm run prisma:migrate

# View database
psql -U user -d da_neighborhood
```

### Development Workflow

```bash
# Frontend only
npm run dev

# Backend only
cd backend && npm run dev

# Everything with Docker
docker-compose up --build

# Run tests before committing (automatic with pre-commit hooks)
git commit -m "Your message"
```

## 🗂️ Project Structure

```
Da-Neighborhood-Shop/
├── docs/                      # Documentation
│   ├── FRONTEND.md           # Frontend guide
│   ├── COMPONENTS.md         # Component documentation
│   ├── SETUP.md              # Setup & deployment
│   ├── TROUBLESHOOTING.md    # Troubleshooting
│   └── INDEX.md              # This file
│
├── src/                       # Frontend React code
│   ├── components/            # React components
│   ├── services/             # Services (Gemini API)
│   ├── tests/                # Component tests
│   ├── App.tsx               # Main component
│   ├── types.ts              # TypeScript types
│   └── index.tsx             # Entry point
│
├── backend/                   # Express backend
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   ├── services/         # Services
│   │   └── index.ts          # Server
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/       # DB migrations
│   ├── scripts/              # Health checks, init
│   ├── tests/                # API tests
│   └── README.md             # Backend docs
│
├── .github/
│   └── workflows/            # CI/CD
│       └── tests.yml         # Test workflow
│
├── README.md                  # Main readme
├── TESTING.md                 # Testing guide
├── docker-compose.yml         # Docker setup
├── Dockerfile                 # Frontend Docker
└── package.json               # Frontend deps
```

## 🔧 Technology Stack

### Frontend
- React 19 - UI framework
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS - Styling
- Vitest - Testing

### Backend
- Node.js - Runtime
- Express - Web framework
- TypeScript - Type safety
- Prisma - ORM
- PostgreSQL - Database
- Vitest - Testing

### DevOps
- Docker - Containerization
- GitHub Actions - CI/CD
- Husky - Git hooks

## 📖 API Reference

### Health Check
```
GET /api/health
```

### Lyrics Generation
```
POST /api/lyrics/generate
{ "prompt": "string", "userId": "number?" }
```

### Get Lyrics
```
GET /api/lyrics/:id
GET /api/lyrics/user/:userId
```

See [Backend Guide](./backend/README.md#api-endpoints) for details.

## 🧪 Testing

### Frontend Tests
```bash
npm run test           # Watch mode
npm run test:run      # Single run
npm run test:ui       # Interactive UI
```

### Backend Tests
```bash
cd backend
npm run test          # Watch mode
npm run test:run     # Single run
npm run health-check # System verification
```

See [Testing Guide](./TESTING.md) for comprehensive coverage.

## 🐳 Docker

### Quick Start
```bash
docker-compose up --build
```

### Services
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:5432

### Useful Commands
```bash
docker-compose ps                # View containers
docker-compose logs -f backend  # View logs
docker-compose down -v          # Stop & remove
```

See [Setup & Deployment](./docs/SETUP.md#docker) for more.

## 🚀 CI/CD

GitHub Actions runs on every push and pull request:
- Frontend tests
- Backend tests
- Database integration tests

See `.github/workflows/tests.yml` for configuration.

## 🔐 Environment Variables

### Frontend (.env)
```
GEMINI_API_KEY=your_api_key
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/da_neighborhood
```

## ❓ FAQs

**Q: How do I get a Gemini API key?**
A: Visit https://aistudio.google.com, sign in, and create an API key.

**Q: Can I run without Docker?**
A: Yes, see [Setup Guide](./docs/SETUP.md#step-4-set-up-database) for local setup.

**Q: How do I add a new database field?**
A: Edit `backend/prisma/schema.prisma`, then run `npm run prisma:migrate`.

**Q: How do I test the API?**
A: Use curl, Postman, or Thunder Client. See [Backend Guide](./backend/README.md#api-endpoints).

**Q: How do I deploy to production?**
A: See [Setup & Deployment](./docs/SETUP.md#deployment).

## 📞 Support

For issues, questions, or suggestions:
1. Check [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
2. Search [GitHub Issues](../../issues)
3. Create a new issue with:
   - Error message and stack trace
   - Steps to reproduce
   - Environment (OS, Node version, etc.)

## 📚 External Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Express Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Docker Docs](https://docs.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Google Generative AI](https://ai.google.dev/)

## 📝 Contributing

1. Read this documentation
2. Create feature branch
3. Follow project structure
4. Write tests for new code
5. Run `npm run test:run` before committing
6. Submit pull request

See [Setup Guide](./docs/SETUP.md#contributing) for details.

---

**Last Updated:** December 4, 2025
**Version:** 1.0.0
