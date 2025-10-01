# Docker Services Status

## Current Running Services

### 1. MySQL Database (Docker)

-   **Container**: mogiapp-mysql-dev
-   **Image**: mysql:8.0
-   **Status**: Running
-   **Ports**: 3307 (mapped to 3306 internally)
-   **Access**:
    ```bash
    docker exec -it mogiapp-mysql-dev mysql -u mogiuser -pmogipassword mogiapp
    ```

### 2. Backend Server (Docker)

-   **Container**: mogiapp-server-dev
-   **Image**: mogi-unified-suite-server
-   **Status**: Running
-   **Ports**: 5000
-   **API Health Check**: http://localhost:5000/api/health

### 3. Frontend (Local Development)

-   **Process**: Node.js Vite development server
-   **Status**: Running
-   **Port**: 8081
-   **Access**: http://localhost:8081

## Service Connections

-   **Frontend** → **Backend API**: http://localhost:5000
-   **Backend** → **MySQL Database**: mysql:3306 (internal Docker network)

## Environment Variables

The services are configured using the `.env` file with the following key settings:

-   Database: `mysql://mogiuser:mogipassword@localhost:3307/mogiapp`
-   JWT Secret: `mogiapp-secret-key`
-   API URL for frontend: `http://localhost:5000`

## Docker Commands

### Check Running Services

```bash
docker-compose -f docker-compose.dev.yml ps
```

### View Logs

```bash
# MySQL
docker logs mogiapp-mysql-dev

# Backend Server
docker logs mogiapp-server-dev
```

### Restart Services

```bash
# Restart all services
docker-compose -f docker-compose.dev.yml restart

# Restart specific service
docker-compose -f docker-compose.dev.yml restart server
```

### Stop Services

```bash
docker-compose -f docker-compose.dev.yml down
```

## Known Issues & Workarounds

### Frontend Docker Build Issue

-   **Problem**: npm install fails with SIGSEGV error when building frontend in Docker
-   **Workaround**: Run backend and database via Docker, start frontend locally with `npm run dev`
-   **Reference**: This is a documented issue in the project memory

## Testing Service Connectivity

### Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Get blogs
curl http://localhost:5000/api/blogs
```

### Frontend

Open browser to: http://localhost:8081

## Contact Management System

The contact management system is fully functional:

-   Public contact form saves messages to database
-   Admin panel displays all contact messages
-   Admins can delete contact messages
-   Email notifications sent when SMTP configured

## Data Persistence

All data is persisted in the MySQL database:

-   Blog posts
-   Products
-   Users
-   Contact messages

The database uses a Docker named volume for persistence between container restarts.
