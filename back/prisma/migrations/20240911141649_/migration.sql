-- DropIndex
DROP INDEX `followers_userFollowId_fkey` ON `followers`;

-- DropIndex
DROP INDEX `user_confidentialityId_fkey` ON `user`;

-- DropIndex
DROP INDEX `user_roleId_fkey` ON `user`;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_confidentialityId_fkey` FOREIGN KEY (`confidentialityId`) REFERENCES `confidentiality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_userFollowId_fkey` FOREIGN KEY (`userFollowId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
