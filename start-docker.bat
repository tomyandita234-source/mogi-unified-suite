@echo off
title MogiApp Docker Starter

echo 🚀 Starting MogiApp with Docker...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if docker-compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ docker-compose is not installed. Please install Docker Desktop (includes docker-compose).
    pause
    exit /b 1
)

REM Build and start all services
echo 🔄 Building and starting Docker containers...
docker-compose up -d

echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

echo ✅ Services started successfully!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo 📊 MongoDB: mongodb://localhost:27017

echo.
echo To view logs: docker-compose logs
echo To stop services: docker-compose down
echo.

pause