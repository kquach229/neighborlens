/*
  Warnings:

  - Made the column `comment` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wouldIPayForThis` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `suggestions` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatIDislike` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatILike` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "wouldIPayForThis" SET NOT NULL,
ALTER COLUMN "suggestions" SET NOT NULL,
ALTER COLUMN "whatIDislike" SET NOT NULL,
ALTER COLUMN "whatILike" SET NOT NULL;
