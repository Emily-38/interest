/*
  Warnings:

  - You are about to drop the column `userFollowId` on the `followers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,followerId]` on the table `followers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `followers_userFollowId_fkey` ON `followers`;

-- DropIndex
DROP INDEX `user_confidentialityId_fkey` ON `user`;

-- DropIndex
DROP INDEX `user_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `followers` DROP COLUMN `userFollowId`,
    ADD COLUMN `followerId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `followers_userId_followerId_key` ON `followers`(`userId`, `followerId`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_confidentialityId_fkey` FOREIGN KEY (`confidentialityId`) REFERENCES `confidentiality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
