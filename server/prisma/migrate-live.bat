@echo off
REM Prisma Migration Script for Live Server Deployment (Windows)
REM This script should be run on your live server

echo Starting Prisma migration for live server deployment...

REM Check if DATABASE_URL is set
if "%DATABASE_URL%"=="" (
  echo Error: DATABASE_URL environment variable is not set
  echo Please set your database connection string as an environment variable
  echo Example: set DATABASE_URL=mysql://user:password@host:port/database
  exit /b 1
)

REM Generate Prisma Client
echo Generating Prisma Client...
npx prisma generate

REM Run migrations
echo Running database migrations...
npx prisma migrate deploy

REM Seed database (optional)
echo Seeding database with initial data...
node prisma/seed.js

echo Prisma migration completed successfully!