/*
  Warnings:

  - You are about to drop the column `seciton_type` on the `project_sections` table. All the data in the column will be lost.
  - Added the required column `item_type` to the `boq_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_id` to the `boq_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency_id` to the `project_sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_type` to the `project_sections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."project_sections" DROP CONSTRAINT "project_sections_location_id_fkey";

-- AlterTable
ALTER TABLE "boq_items" ADD COLUMN     "item_type" TEXT NOT NULL,
ADD COLUMN     "material_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "currency" ADD COLUMN     "symbol" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_sections" DROP COLUMN "seciton_type",
ADD COLUMN     "currency_id" INTEGER NOT NULL,
ADD COLUMN     "section_type" TEXT NOT NULL,
ADD COLUMN     "total_amount" DECIMAL(15,2),
ALTER COLUMN "location_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "project_boq_config" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "numbering_system" VARCHAR(50) NOT NULL DEFAULT 'hierarchical',
    "currency_code" VARCHAR(3) NOT NULL,
    "decimal_places" INTEGER DEFAULT 2,
    "section_types" JSONB,
    "custom_fields" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_boq_config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_boq_config" ADD CONSTRAINT "project_boq_config_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
