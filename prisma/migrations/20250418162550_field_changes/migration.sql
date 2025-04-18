/*
  Warnings:

  - You are about to drop the column `problem` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `biggestRisk` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `competitors` on the `Review` table. All the data in the column will be lost.
  - Added the required column `type` to the `CreditHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemItSolves` to the `Idea` table without a default value. This is not possible if the table is not empty.
  - Made the column `briefDescription` on table `Idea` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CreditType" AS ENUM ('CREDIT', 'DEBIT');

-- AlterTable
ALTER TABLE "CreditHistory" ADD COLUMN     "type" "CreditType" NOT NULL;

-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "problem",
DROP COLUMN "solution",
ADD COLUMN     "problemItSolves" TEXT NOT NULL,
ALTER COLUMN "briefDescription" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "biggestRisk",
DROP COLUMN "competitors",
ADD COLUMN     "suggestions" TEXT,
ADD COLUMN     "whatIDislike" TEXT,
ADD COLUMN     "whatILike" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planTier" "PlanTier" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "creditsGranted" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_stripeSessionId_key" ON "Purchase"("stripeSessionId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
