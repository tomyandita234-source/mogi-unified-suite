-- AlterTable
ALTER TABLE `Blog` MODIFY `body` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NOT NULL,
    MODIFY `longDescription` TEXT NULL;
