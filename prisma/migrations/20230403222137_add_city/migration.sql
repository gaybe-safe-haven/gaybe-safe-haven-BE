/*
  Warnings:

  - You are about to drop the column `city` on the `Shelter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "city",
ALTER COLUMN "zip" SET DATA TYPE TEXT;
