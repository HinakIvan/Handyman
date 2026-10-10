SET FOREIGN_KEY_CHECKS=0;
-- CreateTable
CREATE TABLE `AccountUser` (
    `id` VARCHAR(72) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    `fullName` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceCategory` (
    `id` VARCHAR(72) NOT NULL,
    `key` ENUM('ASSEMBLY', 'DEMOLITION', 'FLOORING', 'PAINTING', 'DRYWALL', 'PLUMBING_MINOR', 'BATHROOM_KITCHEN', 'DOORS_WINDOWS', 'OUTDOOR', 'MOVING', 'COMMERCIAL') NOT NULL,
    `titleDe` VARCHAR(255) NOT NULL,
    `titleEn` VARCHAR(255) NOT NULL,
    `titleRu` VARCHAR(255) NOT NULL,
    `baselineHourlyRate` DECIMAL(10, 2) NOT NULL,
    `typicalRangeEur` VARCHAR(100) NOT NULL,
    `craftClassification` ENUM('FREIES_HANDWERK', 'MEISTER_KOOPERATION') NOT NULL DEFAULT 'FREIES_HANDWERK',
    `leadArtisan` VARCHAR(255) NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `descriptionDe` TEXT NULL,
    `descriptionEn` TEXT NULL,
    `descriptionRu` TEXT NULL,
    `imageUrl` VARCHAR(700) NULL,
    `iconName` VARCHAR(100) NULL,
    `displayOrder` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServiceCategory_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViennaDistrict` (
    `id` VARCHAR(72) NOT NULL,
    `districtCode` VARCHAR(10) NOT NULL,
    `districtName` VARCHAR(100) NOT NULL,
    `districtNumber` INTEGER NOT NULL,
    `zone` ENUM('INNER_CITY', 'CENTRAL', 'OUTER_RING', 'GREATER_SUBURB') NOT NULL,
    `leadTimeHours` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ViennaDistrict_districtCode_key`(`districtCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SetupChecklistItem` (
    `id` VARCHAR(72) NOT NULL,
    `itemKey` ENUM('VAT_UID', 'OFFICIAL_CONTACT', 'REGISTERED_ADDRESS', 'OPERATING_HOURS') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(500) NOT NULL,
    `status` ENUM('PENDING', 'IN_REVIEW', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `fieldValue` VARCHAR(500) NOT NULL,
    `legalRef` VARCHAR(255) NOT NULL,
    `lastUpdated` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SetupChecklistItem_itemKey_key`(`itemKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqItem` (
    `id` VARCHAR(72) NOT NULL,
    `category` ENUM('PRICING', 'SCOPE', 'SCHEDULING', 'MATERIALS') NOT NULL,
    `questionDe` TEXT NOT NULL,
    `questionEn` TEXT NOT NULL,
    `questionRu` TEXT NOT NULL,
    `answerDe` TEXT NOT NULL,
    `answerEn` TEXT NOT NULL,
    `answerRu` TEXT NOT NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuoteRequest` (
    `id` VARCHAR(72) NOT NULL,
    `trackingCode` VARCHAR(64) NOT NULL,
    `customerId` VARCHAR(72) NULL,
    `clientName` VARCHAR(255) NOT NULL,
    `clientPhone` VARCHAR(100) NOT NULL,
    `clientEmail` VARCHAR(255) NOT NULL,
    `serviceCategoryId` VARCHAR(72) NOT NULL,
    `districtId` VARCHAR(72) NOT NULL,
    `addressSnippet` VARCHAR(255) NOT NULL,
    `taskTitle` VARCHAR(255) NOT NULL,
    `taskDescription` TEXT NOT NULL,
    `estimatedHours` INTEGER NOT NULL,
    `estimatedBudgetEur` DECIMAL(10, 2) NOT NULL,
    `preferredDate` VARCHAR(50) NOT NULL,
    `preferredTimeSlot` ENUM('MORNING', 'AFTERNOON', 'FLEXIBLE') NOT NULL DEFAULT 'FLEXIBLE',
    `hasMaterials` BOOLEAN NOT NULL DEFAULT false,
    `agreedToTerms` BOOLEAN NOT NULL DEFAULT false,
    `submissionLang` ENUM('DE', 'EN', 'RU') NOT NULL DEFAULT 'DE',
    `isUrgent` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('NEW', 'CONTACTED', 'ESTIMATE_SENT', 'QUOTED', 'SCHEDULED', 'COMPLETED') NOT NULL DEFAULT 'NEW',
    `createdAtFormatted` VARCHAR(100) NULL,
    `scopeNotes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `QuoteRequest_trackingCode_key`(`trackingCode`),
    INDEX `QuoteRequest_customerId_idx`(`customerId`),
    INDEX `QuoteRequest_serviceCategoryId_idx`(`serviceCategoryId`),
    INDEX `QuoteRequest_districtId_idx`(`districtId`),
    INDEX `QuoteRequest_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuoteRequest` ADD CONSTRAINT `QuoteRequest_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `AccountUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteRequest` ADD CONSTRAINT `QuoteRequest_serviceCategoryId_fkey` FOREIGN KEY (`serviceCategoryId`) REFERENCES `ServiceCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteRequest` ADD CONSTRAINT `QuoteRequest_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `ViennaDistrict`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;