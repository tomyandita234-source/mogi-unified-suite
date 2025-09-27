#!/bin/bash

# Deployment script for MogiApp Unified Suite
# This script should be run on your live server

echo "Starting deployment of MogiApp Unified Suite..."

# Pull latest changes
echo "Pulling latest code from repository..."
git pull origin main

# Navigate to server directory
cd server

# Install dependencies
echo "Installing production dependencies..."
npm ci --only=production

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Seed database with initial data
echo "Seeding database..."
npm run init-db

# Build frontend (if needed)
echo "Building frontend..."
cd ..
npm run build

# Restart services (you may need to adjust this based on your setup)
echo "Restarting services..."
# pm2 restart server
# or
# systemctl restart mogiapp

echo "Deployment completed successfully!"