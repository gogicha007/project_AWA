/*
  Warnings:

  - You are about to drop the column `currencyId` on the `project_sections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."project_sections" DROP CONSTRAINT "project_sections_currencyId_fkey";

-- AlterTable
ALTER TABLE "project_sections" DROP COLUMN "currencyId";
