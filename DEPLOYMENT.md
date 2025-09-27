# MogiApp Unified Suite Deployment

This document explains how to deploy the MogiApp Unified Suite to your live server.

## Prerequisites

1. Node.js 18+ installed
2. MySQL 8.0+ database
3. Git installed
4. Docker (optional, if using containerized deployment)

## Quick Deployment

### For Linux/macOS servers:

```bash
chmod +x deploy.sh
./deploy.sh
```

### For Windows servers:

```cmd
deploy.bat
```

## Manual Deployment Steps

1. **Clone/Pull Repository**
   ```bash
   git pull origin main
   ```

2. **Install Dependencies**
   ```bash
   cd server
   npm ci --only=production
   ```

3. **Set Environment Variables**
   Create a `.env` file in the server directory:
   ```env
   DATABASE_URL="mysql://username:password@host:port/database"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

6. **Seed Database (Optional)**
   ```bash
   npm run init-db
   ```

7. **Start Application**
   ```bash
   npm start
   ```

## Docker Deployment

1. **Build Production Images**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. **Run in Background**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Environment Variables

Required environment variables:

- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)

## Health Check

The application includes a health check endpoint at:
```
GET /api/health
```

This returns:
```json
{
  "status": "OK",
  "timestamp": "2025-09-28T10:00:00.000Z"
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL in .env file
   - Ensure MySQL server is running and accessible

2. **Prisma Client Generation Failed**
   - Ensure Prisma CLI is installed: `npm install prisma -g`
   - Check prisma/schema.prisma file for syntax errors

3. **Migration Failed**
   - Check database permissions
   - Ensure database user has CREATE, ALTER, DROP privileges

### Checking Migration Status

```bash
npx prisma migrate status
```

### Reset Database (Development Only)

```bash
npx prisma migrate reset
```

## Updating the Application

To update to the latest version:

1. Pull the latest code:
   ```bash
   git pull origin main
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

   Or on Windows:
   ```cmd
   deploy.bat
   ```