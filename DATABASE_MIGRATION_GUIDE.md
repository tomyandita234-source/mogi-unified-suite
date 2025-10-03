# Database Migration Guide

## Overview

This guide explains how to apply the database schema changes required for the new auto blog generation features and other enhancements.

## Prerequisites

-   MySQL database server running
-   Valid database credentials in `server/.env` file
-   Prisma CLI installed

## Migration Steps

### 1. Verify Database Connection

First, ensure your database is accessible with the credentials in `server/.env`:

```
# Check .env file
DATABASE_URL=mysql://mogiuser:mogipassword@localhost:3306/mogiapp
```

### 2. Apply the Migration

Run the following command from the `server` directory:

```bash
cd server
npx prisma migrate dev --name add_tasklog_and_blog_fields
```

This will:

-   Create the `TaskLog` table
-   Add `externalUrl` and `publishedAt` columns to the `Blog` table
-   Add `apiKey` column to the `User` table

### 3. Verify Migration Success

Check that the migration was applied successfully:

```bash
npx prisma migrate status
```

### 4. Update Prisma Client

Generate the updated Prisma client:

```bash
npx prisma generate
```

## Manual Migration (If Automatic Migration Fails)

If the automatic migration fails, you can apply the changes manually using the SQL script:

### SQL Script Location

`server/prisma/migrations/20251002000000_add_tasklog_and_blog_fields/migration.sql`

### Manual SQL Commands

```sql
-- Alter Blog table
ALTER TABLE `Blog` ADD COLUMN `externalUrl` VARCHAR(191) NULL UNIQUE;
ALTER TABLE `Blog` ADD COLUMN `publishedAt` DATETIME(3) NULL;

-- Alter User table
ALTER TABLE `User` ADD COLUMN `apiKey` VARCHAR(191) NULL;

-- Create TaskLog table
CREATE TABLE `TaskLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskName` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `details` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Troubleshooting

### Authentication Failed Error

If you encounter authentication errors:

1. Verify the database is running
2. Check credentials in `server/.env`
3. Ensure the database user has proper permissions

### Migration Already Applied

If the migration has already been applied:

1. Check `prisma/migrations/migration_lock.toml`
2. You may need to reset the migration history (only in development)

### Database Connection Issues

If you cannot connect to the database:

1. Verify the database server is running
2. Check firewall settings
3. Ensure the correct port is being used (default: 3306)

## Post-Migration Verification

After applying the migration, verify the changes:

1. Check that the `TaskLog` table exists:

    ```sql
    DESCRIBE TaskLog;
    ```

2. Check that new columns were added to `Blog` table:

    ```sql
    DESCRIBE Blog;
    ```

3. Check that `apiKey` column was added to `User` table:
    ```sql
    DESCRIBE User;
    ```

## Rollback (If Needed)

To rollback the migration (in development only):

```bash
npx prisma migrate reset
```

**Warning**: This will delete all data in your database.

## Production Deployment

For production deployment:

1. Create a migration script for production database
2. Test the migration in a staging environment first
3. Backup production database before applying migration
4. Apply migration during maintenance window
5. Verify application functionality after migration

## Additional Notes

-   The migration is backward compatible
-   No existing data will be lost
-   New features will only be available after migration
-   The application will not function correctly without these schema changes
