# Docker Setup Instructions for MogiApp

## Prerequisites

1. Docker Desktop for Windows installed and running
2. Windows PowerShell or Command Prompt (run as Administrator for best results)

## Running the Application with Docker

### Method 1: Using the Batch File (Windows)

1. Right-click on `start-docker.bat` in your project folder
2. Select "Run as administrator"
3. Wait for the containers to build and start

### Method 2: Using Command Line

Open PowerShell or Command Prompt as Administrator and run:

```bash
# Navigate to your project directory
cd c:\Users\Irham\Documents\mogi-unified-suite

# Start all services
docker-compose up -d
```

### Method 3: Development Mode (with hot-reloading)

For development with live reloading:

```bash
# Navigate to your project directory
cd c:\Users\Irham\Documents\mogi-unified-suite

# Start all services in development mode
docker-compose -f docker-compose.dev.yml up -d
```

## Services Overview

Once running, the following services will be available:

1. **Frontend**: http://localhost:5173
   - React/Vite application with hot-reloading in dev mode

2. **Backend API**: http://localhost:5000
   - Express server with REST API endpoints

3. **MongoDB**: mongodb://localhost:27017
   - Database with persistent data storage

## Useful Docker Commands

### View Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs server
docker-compose logs frontend
docker-compose logs mongodb
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop specific service
docker-compose stop server
```

### Rebuild Containers
```bash
# Rebuild all containers
docker-compose up -d --build

# Rebuild specific container
docker-compose build server
```

### Access Container Shells
```bash
# Access server container
docker exec -it mogiapp-server sh

# Access frontend container
docker exec -it mogiapp-frontend sh

# Access MongoDB shell
docker exec -it mogiapp-mongodb mongosh
```

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**
   - Solution: Run PowerShell/Command Prompt as Administrator

2. **Port Already in Use**
   - Solution: Stop conflicting services or change ports in docker-compose.yml

3. **Build Failures**
   - Solution: Check internet connection and try again
   - Run: `docker-compose build --no-cache`

4. **Containers Not Starting**
   - Check logs: `docker-compose logs`
   - Ensure Docker Desktop is running

### Windows-Specific Issues

1. **Docker Desktop Not Starting**
   - Ensure Windows Subsystem for Linux (WSL2) is installed
   - Enable required Windows features:
     - Hyper-V
     - Windows Subsystem for Linux
     - Virtual Machine Platform

2. **File Sharing Issues**
   - In Docker Desktop Settings > Resources > File Sharing
   - Add your project directory to shared paths

## Data Persistence

MongoDB data is stored in a Docker volume, which means your data will persist even if you stop and restart the containers.

To completely remove all data:
```bash
docker-compose down -v
```

## Environment Variables

You can customize the application by modifying environment variables in the docker-compose.yml files:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `VITE_API_URL`: Frontend API URL

## Next Steps

1. Access the frontend at http://localhost:5173
2. Access the backend API at http://localhost:5000
3. Test API endpoints using tools like Postman or curl
4. Connect to MongoDB using a database client at mongodb://localhost:27017

Your application is now fully containerized and ready to use!