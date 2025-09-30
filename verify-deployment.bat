@echo off
REM Verification script for MogiApp Unified Suite deployment (Windows)
REM This script checks if all components are properly configured and running

echo 🔍 Verifying MogiApp Unified Suite deployment...

REM Check if required tools are installed
echo 🔧 Checking required tools...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    exit /b 1
)
echo ✅ Node.js is installed

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    exit /b 1
)
echo ✅ npm is installed

docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Docker is not installed (optional for containerized deployment)
) else (
    echo ✅ Docker is installed
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  docker-compose is not installed (optional for containerized deployment)
) else (
    echo ✅ docker-compose is installed
)

REM Check if .env file exists
echo 🔑 Checking environment configuration...
if not exist ".env" (
    echo ⚠️  .env file not found. Please create one based on .env.example
) else (
    echo ✅ .env file found
)

REM Check server directory
echo 📁 Checking server directory...
if not exist "server" (
    echo ❌ Server directory not found
    exit /b 1
)
echo ✅ Server directory found

REM Check server dependencies
echo 📦 Checking server dependencies...
cd server
if not exist "package.json" (
    echo ❌ Server package.json not found
    exit /b 1
)
echo ✅ Server package.json found

if not exist "node_modules" (
    echo ⚠️  Server node_modules not found. Run 'npm install' in server directory
) else (
    echo ✅ Server node_modules found
)

REM Check Prisma setup
echo 📊 Checking Prisma setup...
if not exist "prisma\schema.prisma" (
    echo ❌ Prisma schema not found
    exit /b 1
)
echo ✅ Prisma schema found

if not exist "prisma\migrations" (
    echo ⚠️  Prisma migrations not found
) else (
    echo ✅ Prisma migrations found
)

REM Check frontend dependencies
echo 🎨 Checking frontend dependencies...
cd ..
if not exist "package.json" (
    echo ❌ Frontend package.json not found
    exit /b 1
)
echo ✅ Frontend package.json found

if not exist "node_modules" (
    echo ⚠️  Frontend node_modules not found. Run 'npm install' in root directory
) else (
    echo ✅ Frontend node_modules found
)

REM Check build directory
if not exist "dist" (
    echo ⚠️  Frontend dist directory not found. Run 'npm run build' to build the frontend
) else (
    echo ✅ Frontend dist directory found
)

REM Check uploads directory
echo 📤 Checking uploads directory...
if not exist "uploads" (
    echo 📁 Creating uploads directory...
    mkdir uploads
    echo ✅ Uploads directory created
) else (
    echo ✅ Uploads directory found
)

REM Summary
echo.
echo 📋 Deployment verification summary:
echo ==============================
echo ✅ All required tools are installed
echo ✅ Project structure is correct
echo ✅ Prisma schema is properly configured
echo ⚠️  Some dependencies may need to be installed
echo ⚠️  Environment variables may need to be configured

echo.
echo 🚀 To complete the setup:
echo 1. Copy .env.example to .env and configure your environment variables
echo 2. Run 'npm install' in both root and server directories
echo 3. Run 'npm run build' to build the frontend
echo 4. For Docker deployment: Run 'start-docker.bat'
echo 5. For traditional deployment: Follow the instructions in DEPLOYMENT.md

echo.
echo ✅ Verification completed!
echo.
pause