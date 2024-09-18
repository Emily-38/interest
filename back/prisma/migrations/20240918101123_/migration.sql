-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `gdpr` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `interestId` JSON NOT NULL,
    `confidentialityId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_pseudo_key`(`pseudo`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

-- CreateTable
CREATE TABLE `confidentiality` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `confidentiality_name_key`(`name`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

-- CreateTable
CREATE TABLE `role` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

-- CreateTable
CREATE TABLE `followers` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `followerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `followers_userId_followerId_key`(`userId`, `followerId`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_confidentialityId_fkey` FOREIGN KEY (`confidentialityId`) REFERENCES `confidentiality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
