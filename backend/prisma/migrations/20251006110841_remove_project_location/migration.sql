/*
  Warnings:

  - You are about to drop the `boq_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_breakdown_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_material_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_parent_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_location" DROP CONSTRAINT "project_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_location" DROP CONSTRAINT "project_location_project_id_fkey";

-- AlterTable
ALTER TABLE "project_boq_config" ALTER COLUMN "currency_code" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."boq_items";

-- DropTable
DROP TABLE "public"."project_location";

-- CreateTable
CREATE TABLE "boq_item" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "breakdown_id" INTEGER,
    "item_number" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "material_id" INTEGER,
    "unit_id" INTEGER,
    "quantity" DECIMAL(12,4),
    "unit_price" DECIMAL(12,2),
    "total_price" DECIMAL(15,2),
    "parent_item_id" INTEGER,
    "level" INTEGER DEFAULT 0,
    "item_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "boq_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "project_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_breakdown_id_fkey" FOREIGN KEY ("breakdown_id") REFERENCES "boq_breakdown"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material_name"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_parent_item_id_fkey" FOREIGN KEY ("parent_item_id") REFERENCES "boq_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
