# Prisma Migration Deployment Guide

This guide explains how to deploy the MogiApp Unified Suite to your live server with Prisma migrations.

## Prerequisites

1. Node.js installed on your live server
2. MySQL database accessible from your live server
3. Git installed on your live server

## Deployment Steps

### 1. Clone the Repository

```bash
git pull origin main
# or
git clone <your-repository-url>
```

### 2. Install Dependencies

```bash
cd mogi-unified-suite/server
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the `server` directory with your database connection:

```env
DATABASE_URL="mysql://your_username:your_password@your_host:3306/your_database"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```

### 4. Run Prisma Migrations

#### For Linux/macOS servers:
```bash
cd prisma
chmod +x migrate-live.sh
./migrate-live.sh
```

#### For Windows servers:
```cmd
cd prisma
migrate-live.bat
```

### 5. Start the Application

```bash
cd ..
npm start
```

## Manual Migration Commands

If you prefer to run the commands manually:

1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Deploy migrations:
   ```bash
   npx prisma migrate deploy
   ```

3. Seed the database (optional):
   ```bash
   node prisma/seed.js
   ```

## Troubleshooting

### Common Issues

1. **Connection refused**: Ensure your database is accessible from your server
2. **Authentication failed**: Check your database credentials in DATABASE_URL
3. **Migration already applied**: Use `npx prisma migrate status` to check current status

### Checking Migration Status

```bash
npx prisma migrate status
```

### Resetting Migrations (Development only)

```bash
npx prisma migrate reset
```

## Database Schema

The current schema includes three models:

1. **User**: Authentication and user management
2. **Blog**: Blog post management
3. **Product**: Product information management

All models are defined in `prisma/schema.prisma`.

## Migration History

1. `20250927193029_init` - Initial migration with all tables
2. `20250927193348_update_text_fields` - Updated text fields to proper TEXT type

These migrations will be applied in order when you run `npx prisma migrate deploy`.