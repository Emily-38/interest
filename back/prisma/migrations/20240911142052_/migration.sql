/*
  Warnings:

  - Added the required column `profile_image` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `followers_userFollowId_fkey` ON `followers`;

-- DropIndex
DROP INDEX `user_confidentialityId_fkey` ON `user`;

-- DropIndex
DROP INDEX `user_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profile_image` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_confidentialityId_fkey` FOREIGN KEY (`confidentialityId`) REFERENCES `confidentiality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_userFollowId_fkey` FOREIGN KEY (`userFollowId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
