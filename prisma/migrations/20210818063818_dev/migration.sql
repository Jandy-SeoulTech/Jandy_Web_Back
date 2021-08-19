/*
  Warnings:

  - You are about to drop the column `updateAt` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_userfollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `talents` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[channelId]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_userfollow` DROP FOREIGN KEY `_userfollow_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_userfollow` DROP FOREIGN KEY `_userfollow_ibfk_2`;

-- DropForeignKey
ALTER TABLE `talents` DROP FOREIGN KEY `talents_ibfk_1`;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `updateAt`,
    ADD COLUMN `channelId` INTEGER,
    ADD COLUMN `updatedAt` DATETIME(3),
    MODIFY `src` VARCHAR(200),
    ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `updateAt`,
    ADD COLUMN `department` VARCHAR(50),
    ADD COLUMN `introduce` TEXT,
    ADD COLUMN `updatedAt` DATETIME(3),
    ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3),
    ALTER COLUMN `createdAt` DROP DEFAULT;

-- DropTable
DROP TABLE `_userfollow`;

-- DropTable
DROP TABLE `talents`;

-- CreateTable
CREATE TABLE `interest_talents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contents` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `well_talents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contents` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),
    `email` VARCHAR(30) NOT NULL,
    `auth` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `auth.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follow` (
    `followerId` INTEGER NOT NULL,
    `followingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `followKey`(`followerId`, `followingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participants` (
    `userId` INTEGER NOT NULL,
    `channelId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `channelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `introduce` TEXT,
    `adminId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `channels.name_adminId_unique`(`name`, `adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_tags` (
    `channelId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    PRIMARY KEY (`channelId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_categories` (
    `channelId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `channel_categories_channelId_unique`(`channelId`),
    UNIQUE INDEX `channel_categories_categoryId_unique`(`categoryId`),
    PRIMARY KEY (`channelId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_like` (
    `userId` INTEGER NOT NULL,
    `channelId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    PRIMARY KEY (`userId`, `channelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `images_channelId_unique` ON `images`(`channelId`);

-- AddForeignKey
ALTER TABLE `interest_talents` ADD FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `well_talents` ADD FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow` ADD FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow` ADD FOREIGN KEY (`followingId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels` ADD FOREIGN KEY (`adminId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_tags` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_tags` ADD FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_categories` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_categories` ADD FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_like` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel_like` ADD FOREIGN KEY (`channelId`) REFERENCES `channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
