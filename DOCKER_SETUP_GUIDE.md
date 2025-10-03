# Docker Setup Guide for MogiApp

This guide explains how to set up and run the MogiApp using Docker for both development and production environments.

## Prerequisites

-   Docker Desktop (Windows/Mac) or Docker Engine (Linux)
-   Docker Compose

## Environment Configuration

1. Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

2. Update the values in `.env` as needed for your environment.

## Development Setup

### 1. Build and Start Services

```bash
# Build and start all services
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up --build -d
```

### 2. Database Initialization

After the services are running, initialize the database with sample data:

```bash
# Run database initialization
docker exec -it mogiapp-server-dev npm run init-db
```

### 3. Access the Application

-   Frontend: http://localhost:8082
-   Backend API: http://localhost:5000
-   Database: mysql://localhost:3307

### 4. Development Workflow

The development setup includes hot-reloading for both frontend and backend:

-   Changes to frontend code will automatically reload in the browser
-   Changes to backend code will automatically restart the server

## Production Setup

### 1. Build and Start Services

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 2. Database Migration

Run database migrations to set up the schema:

```bash
# Run database migrations
docker exec -it mogiapp-server npx prisma migrate deploy
```

### 3. Database Initialization

Initialize the database with sample data:

```bash
# Run database initialization
docker exec -it mogiapp-server npm run init-db
```

### 4. Access the Application

-   Frontend: http://localhost
-   Backend API: http://localhost:5000
-   Database: mysql://localhost:3306

## Database Access

To access the MySQL database directly:

```bash
# For development
docker exec -it mogiapp-mysql-dev mysql -u mogiuser -pmogipassword mogiapp

# For production
docker exec -it mogiapp-mysql mysql -u mogiuser -pmogipassword mogiapp
```

## Useful Docker Commands

### View Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs server
docker-compose logs mysql
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop services and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### Rebuild Services

```bash
# Rebuild specific service
docker-compose build server

# Rebuild all services
docker-compose build
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure no other services are running on the required ports (3306, 3307, 5000, 80, 8082).

2. **Database connection failed**:

    - Check that the MySQL service is running
    - Verify the database credentials in `.env`
    - Ensure the DATABASE_URL is correctly formatted

3. **Permission denied errors**:
    - On Windows, make sure Docker Desktop is running as administrator
    - On Linux, you might need to run Docker commands with `sudo`

### Reset Development Environment

If you need to completely reset your development environment:

```bash
# Stop and remove containers, networks, and volumes
docker-compose -f docker-compose.dev.yml down -v

# Rebuild and start
docker-compose -f docker-compose.dev.yml up --build
```

## Services Overview

### MySQL Database

-   Container name: `mogiapp-mysql-dev` (dev) / `mogiapp-mysql` (prod)
-   Port: 3307 (dev) / 3306 (prod)
-   Database: `mogiapp`
-   User: `mogiuser`
-   Password: `mogipassword`

### Backend Server

-   Container name: `mogiapp-server-dev` (dev) / `mogiapp-server` (prod)
-   Port: 5000
-   Built from: `server/Dockerfile.unified`

### Frontend

-   Container name: `mogiapp-frontend-dev` (dev) / `mogiapp-frontend` (prod)
-   Port: 8082 (dev) / 80 (prod)
-   Built from: `Dockerfile.unified`

## Data Persistence

Data is persisted using Docker named volumes:

-   `mysql_data_dev` for development database
-   `mysql_data` for production database

To backup or restore data, you can use standard MySQL tools with the Docker exec command.
