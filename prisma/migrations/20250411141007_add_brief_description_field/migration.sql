/*
  Warnings:

  - Made the column `pricingDetails` on table `Idea` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pricingModel` on table `Idea` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "briefDescription" TEXT,
ALTER COLUMN "pricingDetails" SET NOT NULL,
ALTER COLUMN "pricingModel" SET NOT NULL;
