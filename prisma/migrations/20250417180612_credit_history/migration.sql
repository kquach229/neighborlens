/*
  Warnings:

  - You are about to drop the column `planTier` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,ideaId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CreditReason" AS ENUM ('PURCHASE', 'REVIEW_REWARD', 'MANUAL_ADJUSTMENT', 'REDEMPTION');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "planTier",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Plan";

-- CreateTable
CREATE TABLE "CreditHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" "CreditReason" NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_ideaId_key" ON "Review"("userId", "ideaId");

-- AddForeignKey
ALTER TABLE "CreditHistory" ADD CONSTRAINT "CreditHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
