/*
  Warnings:

  - Added the required column `city` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "city" TEXT NOT NULL;
