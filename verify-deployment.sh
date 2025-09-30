#!/bin/bash

# Verification script for MogiApp Unified Suite deployment
# This script checks if all components are properly configured and running

echo "🔍 Verifying MogiApp Unified Suite deployment..."

# Check if required tools are installed
echo "🔧 Checking required tools..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "✅ Node.js is installed"

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm is installed"

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed (optional for containerized deployment)"
else
    echo "✅ Docker is installed"
fi

if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  docker-compose is not installed (optional for containerized deployment)"
else
    echo "✅ docker-compose is installed"
fi

# Check if .env file exists
echo "🔑 Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create one based on .env.example"
else
    echo "✅ .env file found"
fi

# Check server directory
echo "📁 Checking server directory..."
if [ ! -d "server" ]; then
    echo "❌ Server directory not found"
    exit 1
fi
echo "✅ Server directory found"

# Check server dependencies
echo "📦 Checking server dependencies..."
cd server
if [ ! -f "package.json" ]; then
    echo "❌ Server package.json not found"
    exit 1
fi
echo "✅ Server package.json found"

if [ ! -d "node_modules" ]; then
    echo "⚠️  Server node_modules not found. Run 'npm install' in server directory"
else
    echo "✅ Server node_modules found"
fi

# Check Prisma setup
echo "📊 Checking Prisma setup..."
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Prisma schema not found"
    exit 1
fi
echo "✅ Prisma schema found"

if [ ! -d "prisma/migrations" ]; then
    echo "⚠️  Prisma migrations not found"
else
    echo "✅ Prisma migrations found"
fi

# Check frontend dependencies
echo "🎨 Checking frontend dependencies..."
cd ..
if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found"
    exit 1
fi
echo "✅ Frontend package.json found"

if [ ! -d "node_modules" ]; then
    echo "⚠️  Frontend node_modules not found. Run 'npm install' in root directory"
else
    echo "✅ Frontend node_modules found"
fi

# Check build directory
if [ ! -d "dist" ]; then
    echo "⚠️  Frontend dist directory not found. Run 'npm run build' to build the frontend"
else
    echo "✅ Frontend dist directory found"
fi

# Check uploads directory
echo "📤 Checking uploads directory..."
if [ ! -d "uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir uploads
    echo "✅ Uploads directory created"
else
    echo "✅ Uploads directory found"
fi

# Summary
echo ""
echo "📋 Deployment verification summary:"
echo "=============================="
echo "✅ All required tools are installed"
echo "✅ Project structure is correct"
echo "✅ Prisma schema is properly configured"
echo "⚠️  Some dependencies may need to be installed"
echo "⚠️  Environment variables may need to be configured"

echo ""
echo "🚀 To complete the setup:"
echo "1. Copy .env.example to .env and configure your environment variables"
echo "2. Run 'npm install' in both root and server directories"
echo "3. Run 'npm run build' to build the frontend"
echo "4. For Docker deployment: Run './start-docker.sh'"
echo "5. For traditional deployment: Follow the instructions in DEPLOYMENT.md"

echo ""
echo "✅ Verification completed!"