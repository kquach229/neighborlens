/*
  Warnings:

  - The primary key for the `Plan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhoodId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `noiseLevel` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `safety` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Neighborhood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedNeighborhood` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ideaId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Amenity" DROP CONSTRAINT "Amenity_neighborhoodId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_neighborhoodId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_neighborhoodId_fkey";

-- DropForeignKey
ALTER TABLE "SavedNeighborhood" DROP CONSTRAINT "SavedNeighborhood_neighborhoodId_fkey";

-- DropForeignKey
ALTER TABLE "SavedNeighborhood" DROP CONSTRAINT "SavedNeighborhood_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_planTier_fkey";

-- DropIndex
DROP INDEX "Plan_tier_key";

-- AlterTable
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_pkey",
DROP COLUMN "price",
DROP COLUMN "stripeId",
DROP COLUMN "tier",
ADD COLUMN     "id" "PlanTier" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "features" SET DATA TYPE JSON,
ADD CONSTRAINT "Plan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "neighborhoodId",
DROP COLUMN "noiseLevel",
DROP COLUMN "safety",
DROP COLUMN "tags",
ADD COLUMN     "biggestRisk" TEXT,
ADD COLUMN     "competitors" TEXT,
ADD COLUMN     "ideaId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "whatsUnique" TEXT,
ADD COLUMN     "wouldIPayForThis" TEXT,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Amenity";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Neighborhood";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "SavedNeighborhood";

-- DropEnum
DROP TYPE "AmenityType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetUsers" TEXT,
    "authorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
