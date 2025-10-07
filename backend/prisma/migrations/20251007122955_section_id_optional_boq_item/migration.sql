-- DropForeignKey
ALTER TABLE "public"."boq_item" DROP CONSTRAINT "boq_item_section_id_fkey";

-- AlterTable
ALTER TABLE "boq_item" ALTER COLUMN "section_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "boq_item" ADD CONSTRAINT "boq_item_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "project_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
