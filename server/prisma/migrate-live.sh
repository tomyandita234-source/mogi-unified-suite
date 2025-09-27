#!/bin/bash

# Prisma Migration Script for Live Server Deployment
# This script should be run on your live server

echo "Starting Prisma migration for live server deployment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  echo "Please set your database connection string as an environment variable"
  echo "Example: export DATABASE_URL='mysql://user:password@host:port/database'"
  exit 1
fi

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Seed database (optional)
echo "Seeding database with initial data..."
node prisma/seed.js

echo "Prisma migration completed successfully!"