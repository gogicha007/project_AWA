/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alias` to the `vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vendor_alias_key" ON "vendor"("alias");
