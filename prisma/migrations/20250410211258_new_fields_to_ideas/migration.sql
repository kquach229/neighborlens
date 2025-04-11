/*
  Warnings:

  - You are about to drop the column `description` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `targetUsers` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `whatsUnique` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "description",
DROP COLUMN "targetUsers",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "category" TEXT[],
ADD COLUMN     "pricingDetails" TEXT,
ADD COLUMN     "pricingModel" TEXT,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "solution" TEXT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "whatsUnique";
