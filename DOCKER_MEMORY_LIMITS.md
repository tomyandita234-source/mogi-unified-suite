# Docker Memory Limits Configuration

## Overview

This document describes the memory limits implemented for the Docker containers to ensure optimal resource usage for our small application.

## Memory Configuration

### Development Environment (`docker-compose.dev.yml`)

Each service is limited to:

-   **Memory Limit**: 1GB (1024MB)
-   **Memory Reservation**: 512MB

Services:

1. **MySQL Database** (`mogiapp-mysql-dev`)

    - Container: MySQL 8.0
    - Purpose: Development database
    - Memory: 1GB limit / 512MB reservation

2. **Backend Server** (`mogiapp-server-dev`)

    - Container: Node.js application
    - Purpose: API server with hot reloading
    - Memory: 1GB limit / 512MB reservation

3. **Frontend** (`mogiapp-frontend-dev`)
    - Container: Vite development server
    - Purpose: Frontend development with hot reloading
    - Memory: 1GB limit / 512MB reservation

### Production Environment (`docker-compose.yml`)

Each service is limited to:

-   **Memory Limit**: 1GB (1024MB)
-   **Memory Reservation**: 512MB

Services:

1. **MySQL Database** (`mogiapp-mysql`)

    - Container: MySQL 8.0
    - Purpose: Production database
    - Memory: 1GB limit / 512MB reservation

2. **Backend Server** (`mogiapp-server`)

    - Container: Node.js application (production build)
    - Purpose: API server
    - Memory: 1GB limit / 512MB reservation

3. **Frontend** (`mogiapp-frontend`)
    - Container: Production web server
    - Purpose: Serve compiled frontend assets
    - Memory: 1GB limit / 512MB reservation

## Rationale

### Resource Allocation

-   **Total Memory Usage**: 3GB maximum (1GB per service × 3 services)
-   **Application Size**: Small-scale application that doesn't require extensive resources
-   **Development vs Production**: Same memory limits for consistency

### Benefits

1. **Resource Efficiency**: Prevents any single container from consuming excessive system resources
2. **System Stability**: Ensures consistent performance across all services
3. **Cost Optimization**: Reduces resource consumption in production environments
4. **Predictable Performance**: Known resource limits help with capacity planning

## Current Resource Usage

### Observed Memory Consumption

-   **MySQL Database**: ~350MB (34% of 1GB limit)
-   **Backend Server**: ~55MB (5% of 1GB limit)
-   **Frontend (Local)**: Variable, typically 200-500MB

### CPU Usage

-   **MySQL Database**: Low, typically <1%
-   **Backend Server**: Low, typically <1%
-   **Frontend (Local)**: Minimal when idle

## Commands for Monitoring

### Check Container Status

```bash
docker-compose -f docker-compose.dev.yml ps
```

### Monitor Resource Usage

```bash
# Live monitoring
docker stats

# Single snapshot
docker stats --no-stream
```

### Check Individual Container Resources

```bash
# MySQL
docker stats mogiapp-mysql-dev

# Backend Server
docker stats mogiapp-server-dev
```

## Configuration Files

### docker-compose.dev.yml

```yaml
services:
    mysql:
        mem_limit: 1024m
        mem_reservation: 512m

    server:
        mem_limit: 1024m
        mem_reservation: 512m

    frontend:
        mem_limit: 1024m
        mem_reservation: 512m
```

### docker-compose.yml

```yaml
services:
    mysql:
        mem_limit: 1024m
        mem_reservation: 512m

    server:
        mem_limit: 1024m
        mem_reservation: 512m

    frontend:
        mem_limit: 1024m
        mem_reservation: 512m
```

## Troubleshooting

### Memory Limit Issues

If containers are hitting memory limits:

1. Check for memory leaks in application code
2. Optimize database queries
3. Consider increasing limits for specific high-demand services
4. Monitor with `docker stats` to identify problematic containers

### Adjusting Memory Limits

To modify memory limits:

1. Edit `docker-compose.dev.yml` or `docker-compose.yml`
2. Change `mem_limit` and `mem_reservation` values
3. Restart containers:
    ```bash
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml up -d
    ```

## Best Practices

1. **Monitor Regularly**: Check resource usage during peak times
2. **Plan for Growth**: Adjust limits as application scales
3. **Use Reservations**: Set `mem_reservation` to guarantee minimum memory
4. **Avoid Overcommitment**: Ensure total limits don't exceed system capacity
5. **Test Changes**: Validate performance after adjusting memory limits
