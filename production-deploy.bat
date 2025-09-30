@echo off
REM Production deployment script for MogiApp Unified Suite (Windows)
REM This script ensures all components are properly deployed for production

echo 🚀 Starting production deployment of MogiApp Unified Suite...

REM Pull latest changes
echo 📥 Pulling latest code from repository...
git pull origin main
if %errorlevel% neq 0 (
    echo ❌ Failed to pull latest code
    exit /b 1
)
echo ✅ Code updated successfully

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist "uploads" (
    mkdir uploads
)
echo ✅ Directories created

REM Check and create .env file if it doesn't exist
echo 🔑 Checking environment configuration...
if not exist ".env" (
    echo ⚠️  .env file not found. Creating from .env.example...
    if exist ".env.example" (
        copy .env.example .env
        echo ✅ .env file created. Please update it with your production values!
    ) else (
        echo ❌ .env.example not found. Cannot create .env file.
        exit /b 1
    )
) else (
    echo ✅ .env file found
)

REM Install frontend dependencies
echo 🎨 Installing frontend dependencies...
npm ci --only=production
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
echo ✅ Frontend dependencies installed

REM Build frontend
echo 🏗️  Building frontend application...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    exit /b 1
)
echo ✅ Frontend built successfully

REM Navigate to server directory
cd server

REM Install backend dependencies
echo 🔧 Installing backend dependencies...
npm ci --only=production
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
echo ✅ Backend dependencies installed

REM Generate Prisma Client
echo 📊 Generating Prisma Client...
npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma Client
    exit /b 1
)
echo ✅ Prisma Client generated

REM Run database migrations
echo 💾 Running database migrations...
npx prisma migrate deploy
if %errorlevel% neq 0 (
    echo ❌ Failed to run database migrations
    exit /b 1
)
echo ✅ Database migrations completed

REM Seed database with initial data
echo 🌱 Seeding database with initial data...
npm run init-db
if %errorlevel% neq 0 (
    echo ❌ Failed to seed database
    exit /b 1
)
echo ✅ Database seeded successfully

REM Return to root directory
cd ..

REM Final checks
echo ✅ Production deployment completed successfully!

echo.
echo 📋 Next steps:
echo 1. Update your .env file with production values
echo 2. Configure your web server to serve the 'dist' directory
echo 3. Start the backend server with 'cd server && npm start'
echo 4. Set up process manager (e.g., PM2) for production
echo.
echo 🌐 Application URLs:
echo    Frontend: http://your-domain.com
echo    Backend API: http://your-domain.com:5000
echo    Health check: http://your-domain.com:5000/api/health
echo.
pause