/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `shipment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shipment_alias_key" ON "shipment"("alias");
