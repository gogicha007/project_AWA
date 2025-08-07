/*
  Warnings:

  - You are about to drop the `PipelineProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `village` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `water_material_need` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PipelineProgress" DROP CONSTRAINT "PipelineProgress_product_id_fkey";

-- DropForeignKey
ALTER TABLE "PipelineProgress" DROP CONSTRAINT "PipelineProgress_unitId_fkey";

-- DropForeignKey
ALTER TABLE "PipelineProgress" DROP CONSTRAINT "PipelineProgress_villageId_fkey";

-- DropForeignKey
ALTER TABLE "water_material_need" DROP CONSTRAINT "water_material_need_product_id_fkey";

-- DropForeignKey
ALTER TABLE "water_material_need" DROP CONSTRAINT "water_material_need_villageId_fkey";

-- DropTable
DROP TABLE "PipelineProgress";

-- DropTable
DROP TABLE "village";

-- DropTable
DROP TABLE "water_material_need";
