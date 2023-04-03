/*
  Warnings:

  - A unique constraint covering the columns `[streetAddress,state,zip]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shelter_streetAddress_state_zip_key" ON "Shelter"("streetAddress", "state", "zip");
