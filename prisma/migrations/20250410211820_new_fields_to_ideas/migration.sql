/*
  Warnings:

  - You are about to drop the column `category` on the `Idea` table. All the data in the column will be lost.
  - Made the column `problem` on table `Idea` required. This step will fail if there are existing NULL values in that column.
  - Made the column `solution` on table `Idea` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "category",
ALTER COLUMN "problem" SET NOT NULL,
ALTER COLUMN "solution" SET NOT NULL;
