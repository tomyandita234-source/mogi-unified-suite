# Docker Deployment Summary

## Process Executed

### 1. Shutdown All Services

-   Stopped all Docker containers using `docker-compose -f docker-compose.dev.yml down`
-   Terminated any running frontend processes

### 2. Attempted Frontend Docker Build

-   Tried to build frontend Docker image: `docker-compose -f docker-compose.dev.yml build frontend`
-   **Result**: Failed due to known npm install SIGSEGV error (documented issue)

### 3. Implemented Workaround Solution

-   Started backend and database services via Docker
-   Started frontend locally using `npm run dev`

## Current Running Services

### Docker Services (Backend & Database)

1. **MySQL Database** (`mogiapp-mysql-dev`)

    - Image: mysql:8.0
    - Status: Running
    - Ports: 3307 (mapped to 3306 internally)
    - Memory Limit: 1GB

2. **Backend Server** (`mogiapp-server-dev`)
    - Image: Custom Node.js application
    - Status: Running
    - Ports: 5000
    - Memory Limit: 1GB

### Local Service (Frontend)

3. **Frontend Application**
    - Process: Node.js Vite development server
    - Status: Running
    - Port: 8082
    - Access: http://localhost:8082

## Service Connectivity Verification

### ✅ Backend API

```bash
curl http://localhost:5000/api/health
# Returns: {"status":"OK","timestamp":"..."}
```

### ✅ Frontend Application

```bash
curl http://localhost:8082
# Returns: HTML content
```

### ✅ Frontend-to-Backend API Connection

```bash
curl http://localhost:8082/api/blogs
# Returns: Blog data (proxied to backend)
```

## Configuration Details

### Docker Memory Limits

All Docker services configured with:

-   **Memory Limit**: 1GB
-   **Memory Reservation**: 512MB

### Vite Proxy Configuration

Frontend API requests proxied through Vite:

```javascript
proxy: {
  "/api": {
    target: "http://localhost:5000",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, "/api"),
  },
}
```

### API Client Configuration

Frontend API client uses relative URLs in development:

```typescript
const API_BASE_URL =
	import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_API_URL || "http://localhost:5000"
```

## Access URLs

| Service     | URL                   | Notes                   |
| ----------- | --------------------- | ----------------------- |
| Frontend    | http://localhost:8082 | Vite development server |
| Backend API | http://localhost:5000 | Docker container        |
| Database    | localhost:3307        | MySQL in Docker         |

## Commands for Management

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
# Restart all Docker services
docker-compose -f docker-compose.dev.yml restart

# Restart specific service
docker-compose -f docker-compose.dev.yml restart server
```

### Stop All Services

```bash
# Stop Docker services
docker-compose -f docker-compose.dev.yml down

# Stop frontend (if running locally)
taskkill /f /im node.exe
```

## Known Issues & Workarounds

### Frontend Docker Build Issue

-   **Problem**: npm install fails with SIGSEGV error in Docker
-   **Workaround**: Run frontend locally with `npm run dev`
-   **Reference**: Documented in project memory

### Port Conflicts

-   **Problem**: Port 8081 may be in use
-   **Solution**: Vite automatically selects next available port (8082)
-   **Configuration**: Updated `vite.config.ts` to reflect actual port

## Resource Usage

### Current Memory Consumption

-   **MySQL Database**: ~350MB / 1GB limit
-   **Backend Server**: ~55MB / 1GB limit
-   **Frontend (Local)**: ~200-500MB

### CPU Usage

-   **MySQL Database**: <1%
-   **Backend Server**: <1%
-   **Frontend (Local)**: Minimal when idle

## Troubleshooting

### If Services Don't Start

1. Check for port conflicts
2. Verify Docker is running
3. Ensure no existing processes on required ports

### If API Connection Fails

1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check Vite proxy configuration
3. Ensure frontend API client uses relative URLs

### If Frontend Won't Start

1. Kill existing Node.js processes: `taskkill /f /im node.exe`
2. Restart with: `npm run dev`
3. Check for port conflicts

## Future Considerations

### Production Deployment

-   Use production Docker configuration
-   Ensure `VITE_API_URL` environment variable is set
-   Consider using nginx or similar for production frontend serving

### Scaling

-   Monitor resource usage under load
-   Adjust memory limits if needed
-   Consider separate database server for production
