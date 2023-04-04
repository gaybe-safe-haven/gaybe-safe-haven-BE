/*
  Warnings:

  - A unique constraint covering the columns `[streetAddress,state,zip,city]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Shelter_streetAddress_state_zip_key";

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_streetAddress_state_zip_city_key" ON "Shelter"("streetAddress", "state", "zip", "city");
