/*
  Warnings:

  - You are about to drop the column `currency_id` on the `project_sections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_sections" DROP CONSTRAINT "project_sections_currency_id_fkey";

-- AlterTable
ALTER TABLE "boq_items" ADD COLUMN     "breakdown_id" INTEGER,
ALTER COLUMN "unit_id" DROP NOT NULL,
ALTER COLUMN "item_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "boq_structure_type" TEXT;

-- AlterTable
ALTER TABLE "project_sections" DROP COLUMN "currency_id",
ADD COLUMN     "currencyId" INTEGER;

-- CreateTable
CREATE TABLE "BoqBreakdown" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "BoqBreakdown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_section_breakdown" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "breakdown_id" INTEGER NOT NULL,

    CONSTRAINT "project_section_breakdown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoqBreakdown_code_key" ON "BoqBreakdown"("code");

-- CreateIndex
CREATE UNIQUE INDEX "project_section_breakdown_section_id_breakdown_id_key" ON "project_section_breakdown"("section_id", "breakdown_id");

-- AddForeignKey
ALTER TABLE "BoqBreakdown" ADD CONSTRAINT "BoqBreakdown_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_breakdown_id_fkey" FOREIGN KEY ("breakdown_id") REFERENCES "BoqBreakdown"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_section_breakdown" ADD CONSTRAINT "project_section_breakdown_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "project_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_section_breakdown" ADD CONSTRAINT "project_section_breakdown_breakdown_id_fkey" FOREIGN KEY ("breakdown_id") REFERENCES "BoqBreakdown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
