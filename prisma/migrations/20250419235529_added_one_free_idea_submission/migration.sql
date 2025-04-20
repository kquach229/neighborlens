/*
  Warnings:

  - You are about to drop the column `planTier` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "planTier",
ALTER COLUMN "credits" SET DEFAULT 1;

-- DropEnum
DROP TYPE "PlanTier";
