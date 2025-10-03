#!/bin/bash

# Script to rebuild Docker containers and run database migrations
echo "=== MogiApp Docker Rebuild and Migration Script ==="

# Check if Docker is running
echo "Checking if Docker is available..."
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running or not accessible."
    echo "Please start Docker Desktop and run this script again."
    exit 1
fi

echo "Docker is available."

# Stop existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.dev.yml down

# Rebuild containers
echo "Rebuilding containers..."
docker-compose -f docker-compose.dev.yml build --no-cache

# Start containers
echo "Starting containers..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 30

# Run database migrations
echo "Running database migrations..."
docker exec mogiapp-server-dev npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
docker exec mogiapp-server-dev npx prisma generate

# Check service status
echo "Checking service status..."
docker-compose -f docker-compose.dev.yml ps

echo "=== Rebuild and Migration Complete ==="
echo "You can now access the application at:"
echo "- Frontend: http://localhost:8082"
echo "- Backend API: http://localhost:5000"