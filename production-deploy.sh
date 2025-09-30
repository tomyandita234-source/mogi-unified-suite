#!/bin/bash

# Production deployment script for MogiApp Unified Suite
# This script ensures all components are properly deployed for production

echo "🚀 Starting production deployment of MogiApp Unified Suite..."

# Check if running as root (optional, but good practice for production)
if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Running as root. This is not recommended for security reasons."
fi

# Pull latest changes
echo "📥 Pulling latest code from repository..."
if ! git pull origin main; then
    echo "❌ Failed to pull latest code"
    exit 1
fi
echo "✅ Code updated successfully"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads
echo "✅ Directories created"

# Check and create .env file if it doesn't exist
echo "🔑 Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env file created. Please update it with your production values!"
    else
        echo "❌ .env.example not found. Cannot create .env file."
        exit 1
    fi
else
    echo "✅ .env file found"
fi

# Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
if ! npm ci --only=production; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"

# Build frontend
echo "🏗️  Building frontend application..."
if ! npm run build; then
    echo "❌ Failed to build frontend"
    exit 1
fi
echo "✅ Frontend built successfully"

# Navigate to server directory
cd server

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
if ! npm ci --only=production; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"

# Generate Prisma Client
echo "📊 Generating Prisma Client..."
if ! npx prisma generate; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi
echo "✅ Prisma Client generated"

# Run database migrations
echo "💾 Running database migrations..."
if ! npx prisma migrate deploy; then
    echo "❌ Failed to run database migrations"
    exit 1
fi
echo "✅ Database migrations completed"

# Seed database with initial data
echo "🌱 Seeding database with initial data..."
if ! npm run init-db; then
    echo "❌ Failed to seed database"
    exit 1
fi
echo "✅ Database seeded successfully"

# Return to root directory
cd ..

# Final checks
echo "✅ Production deployment completed successfully!"

echo ""
echo "📋 Next steps:"
echo "1. Update your .env file with production values"
echo "2. Configure your web server to serve the 'dist' directory"
echo "3. Start the backend server with 'cd server && npm start'"
echo "4. Set up process manager (e.g., PM2) for production"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://your-domain.com"
echo "   Backend API: http://your-domain.com:5000"
echo "   Health check: http://your-domain.com:5000/api/health"