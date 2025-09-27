@echo off
REM Deployment script for MogiApp Unified Suite (Windows)
REM This script should be run on your live server

echo Starting deployment of MogiApp Unified Suite...

REM Pull latest changes
echo Pulling latest code from repository...
git pull origin main

REM Navigate to server directory
cd server

REM Install dependencies
echo Installing production dependencies...
npm ci --only=production

REM Generate Prisma Client
echo Generating Prisma Client...
npx prisma generate

REM Run database migrations
echo Running database migrations...
npx prisma migrate deploy

REM Seed database with initial data
echo Seeding database...
npm run init-db

REM Build frontend (if needed)
echo Building frontend...
cd ..
npm run build

REM Restart services (you may need to adjust this based on your setup)
echo Restarting services...
REM net stop mogiapp
REM net start mogiapp

echo Deployment completed successfully!