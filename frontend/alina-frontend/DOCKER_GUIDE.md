# Docker Deployment Guide

This guide explains how to deploy the Alina platform using Docker.

## 📋 Prerequisites

- Docker Desktop installed
- Docker Compose installed
- .NET backend Dockerfile (needs to be created)

## 🏗️ Architecture

The application consists of 4 services:

```
┌─────────────────────────────────────────────────┐
│                    Alina Stack                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐         ┌──────────────┐    │
│  │   Frontend   │◄────────┤   Backend    │    │
│  │  Next.js:3000│         │   .NET:5602  │    │
│  └──────────────┘         └──────┬───────┘    │
│                                   │            │
│                    ┌──────────────┼──────────┐ │
│                    │              │          │ │
│           ┌────────▼───┐    ┌────▼─────┐   │ │
│           │ PostgreSQL │    │  Redis   │   │ │
│           │   :5432    │    │  :6379   │   │ │
│           └────────────┘    └──────────┘   │ │
│                                             │ │
└─────────────────────────────────────────────┘ │
                                                 
```

## 📦 Services

### 1. Frontend (Next.js)
- **Port**: 3000
- **Purpose**: User interface
- **Tech**: Next.js 16, React 19, Tailwind CSS 4
- **Features**: SSR, Dark mode, Real-time updates

### 2. Backend (.NET)
- **Port**: 5602
- **Purpose**: API server
- **Tech**: .NET 10, Entity Framework
- **Features**: 74 controllers, RESTful API

### 3. PostgreSQL
- **Port**: 5432
- **Purpose**: Primary database
- **Data**: Users, Gigs, Orders, Messages, etc.
- **Persistence**: Volume mounted

### 4. Redis
- **Port**: 6379
- **Purpose**: Caching & sessions
- **Data**: Cache, real-time data
- **Persistence**: Volume mounted

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd /Users/shadi/Desktop/aqlaan-nx/apps/alina/frontend/alina-frontend
```

### 2. Create Environment File

Create `.env.local` in the frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5602

# Database (for backend)
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/alina

# Redis (for backend)
REDIS_URL=redis://redis:6379

# JWT Secret (for backend)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Node Environment
NODE_ENV=production
```

### 3. Start All Services

```bash
# Build and start all containers
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 4. Access the Application

Once all services are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5602
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### 5. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

## 🔧 Backend Dockerfile Setup

The backend needs its own Dockerfile. Create this file:

**Location**: `apps/alina/backend/Dockerfile`

```dockerfile
# Backend Dockerfile for .NET 10
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["Alina.API/Alina.API.csproj", "Alina.API/"]
RUN dotnet restore "Alina.API/Alina.API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/Alina.API"
RUN dotnet build "Alina.API.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "Alina.API.csproj" -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=publish /app/publish .

# Expose port
EXPOSE 5602

# Set environment
ENV ASPNETCORE_URLS=http://+:5602
ENV ASPNETCORE_ENVIRONMENT=Production

# Run
ENTRYPOINT ["dotnet", "Alina.API.dll"]
```

## 📝 Configuration Files

### Frontend Dockerfile

Already created at `Dockerfile`:

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### Docker Compose

Already created at `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: alina
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  backend:
    build:
      context: ../../backend
      dockerfile: Dockerfile
    ports:
      - "5602:5602"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=alina;Username=postgres;Password=postgres
      - Redis__ConnectionString=redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:5602
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

## 🔍 Monitoring & Logs

### View Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs postgres
docker-compose logs redis

# Follow logs in real-time
docker-compose logs -f frontend
```

### Check Service Status

```bash
# List running containers
docker-compose ps

# Check container health
docker ps
```

### Execute Commands in Containers

```bash
# Access frontend shell
docker-compose exec frontend sh

# Access backend shell
docker-compose exec backend bash

# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d alina

# Access Redis CLI
docker-compose exec redis redis-cli
```

## 🗄️ Database Management

### Run Migrations

```bash
# Inside backend container
docker-compose exec backend dotnet ef database update
```

### Backup Database

```bash
docker-compose exec postgres pg_dump -U postgres alina > backup.sql
```

### Restore Database

```bash
cat backup.sql | docker-compose exec -T postgres psql -U postgres alina
```

## 🔒 Security Best Practices

### Production Checklist

- [ ] Change default PostgreSQL password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS (add nginx reverse proxy)
- [ ] Configure CORS properly
- [ ] Use environment variable files (.env) - never commit secrets
- [ ] Enable database backups
- [ ] Set up monitoring (Prometheus, Grafana)
- [ ] Configure log aggregation
- [ ] Use Docker secrets for sensitive data
- [ ] Scan images for vulnerabilities
- [ ] Implement rate limiting

### Environment Variables Security

Never commit these files:
- `.env`
- `.env.local`
- `.env.production`

Create `.env.example` instead:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5602

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Redis
REDIS_URL=redis://host:port

# JWT
JWT_SECRET=change-this-in-production
```

## 🌐 Production Deployment

### With Nginx Reverse Proxy

Add this service to `docker-compose.yml`:

```yaml
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
```

### Nginx Configuration (`nginx.conf`)

```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:5602;
    }

    server {
        listen 80;
        server_name yourdomain.com;

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## 📊 Performance Optimization

### Multi-Stage Builds

Both Dockerfiles use multi-stage builds to reduce image size:

- **Frontend**: ~150MB (vs ~1GB without multi-stage)
- **Backend**: ~200MB (vs ~2GB without multi-stage)

### Caching Layers

Docker caches layers efficiently:

1. Dependencies installed first (rarely changes)
2. Source code copied last (changes frequently)
3. Build artifacts extracted
4. Runtime image optimized

### Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  frontend:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "3001:3000"
```

### Container Won't Start

```bash
# Check logs
docker-compose logs service-name

# Rebuild without cache
docker-compose build --no-cache service-name

# Remove all containers and volumes
docker-compose down -v
docker system prune -a
```

### Database Connection Failed

```bash
# Check if PostgreSQL is ready
docker-compose exec postgres pg_isready

# Check connection string
docker-compose exec backend env | grep CONNECTION

# Check network
docker network inspect alina-frontend_default
```

### Frontend Can't Reach Backend

1. Check backend is running: `docker-compose ps`
2. Check backend health: `curl http://localhost:5602/health`
3. Check environment variables: `docker-compose exec frontend env`
4. Verify network: `docker-compose exec frontend ping backend`

## 📈 Scaling

### Horizontal Scaling

```bash
# Run 3 frontend instances
docker-compose up --scale frontend=3

# Run 2 backend instances
docker-compose up --scale backend=2
```

### Load Balancing

Add nginx to distribute traffic:

```yaml
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    depends_on:
      - frontend
```

## 🎯 Next Steps

1. **Create backend Dockerfile**
2. **Update docker-compose.yml** with backend path
3. **Test locally**: `docker-compose up`
4. **Configure environment variables**
5. **Run database migrations**
6. **Test all features**
7. **Deploy to production** (AWS, Azure, DigitalOcean, etc.)

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [.NET Docker Documentation](https://learn.microsoft.com/en-us/dotnet/core/docker/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Redis Docker Hub](https://hub.docker.com/_/redis)

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose logs`
2. Verify environment variables
3. Ensure ports are available
4. Check Docker daemon is running
5. Review health checks
6. Consult the troubleshooting section above

---

**Happy Deploying! 🚀**
