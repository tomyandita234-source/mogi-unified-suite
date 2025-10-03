@echo off
title MogiApp Docker Rebuild and Migration

echo === MogiApp Docker Rebuild and Migration Script ===

REM Check if Docker is running
echo Checking if Docker is available...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running or not accessible.
    echo Please start Docker Desktop and run this script again.
    pause
    exit /b 1
)

echo Docker is available.

REM Stop existing containers
echo Stopping existing containers...
docker-compose -f docker-compose.dev.yml down

REM Rebuild containers
echo Rebuilding containers...
docker-compose -f docker-compose.dev.yml build --no-cache

REM Start containers
echo Starting containers...
docker-compose -f docker-compose.dev.yml up -d

REM Wait for database to be ready
echo Waiting for database to be ready...
timeout /t 30 /nobreak >nul

REM Run database migrations
echo Running database migrations...
docker exec mogiapp-server-dev npx prisma migrate deploy

REM Generate Prisma client
echo Generating Prisma client...
docker exec mogiapp-server-dev npx prisma generate

REM Check service status
echo Checking service status...
docker-compose -f docker-compose.dev.yml ps

echo === Rebuild and Migration Complete ===
echo You can now access the application at:
echo - Frontend: http://localhost:8082
echo - Backend API: http://localhost:5000

pause