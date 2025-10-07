/*
  Warnings:

  - The `boq_structure_type` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "boqStructureType" AS ENUM ('hierarchical', 'sequential', 'alphanumeric');

-- AlterTable
ALTER TABLE "project" DROP COLUMN "boq_structure_type",
ADD COLUMN     "boq_structure_type" "boqStructureType" NOT NULL DEFAULT 'hierarchical';
