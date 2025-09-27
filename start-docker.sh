#!/bin/bash

echo "🚀 Starting MogiApp with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "❌ docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Build and start all services
echo "🔄 Building and starting Docker containers..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

echo "✅ Services started successfully!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 MongoDB: mongodb://localhost:27017"

echo ""
echo "To view logs: docker-compose logs"
echo "To stop services: docker-compose down"