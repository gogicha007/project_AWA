/*
  Warnings:

  - You are about to drop the column `milestone_idF` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `project_sections` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `project_sections` table. All the data in the column will be lost.
  - You are about to drop the `BoqBreakdown` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `milestone_id` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Made the column `boq_structure_type` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `project_sections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BoqBreakdown" DROP CONSTRAINT "BoqBreakdown_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boq_items" DROP CONSTRAINT "boq_items_breakdown_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."progress" DROP CONSTRAINT "progress_milestone_idF_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_section_breakdown" DROP CONSTRAINT "project_section_breakdown_breakdown_id_fkey";

-- AlterTable
ALTER TABLE "progress" DROP COLUMN "milestone_idF",
ADD COLUMN     "milestone_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "boq_structure_type" SET NOT NULL,
ALTER COLUMN "boq_structure_type" SET DEFAULT 'hierarchical';

-- AlterTable
ALTER TABLE "project_sections" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."BoqBreakdown";

-- CreateTable
CREATE TABLE "boq_breakdown" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "boq_breakdown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boq_breakdown_code_key" ON "boq_breakdown"("code");

-- AddForeignKey
ALTER TABLE "boq_breakdown" ADD CONSTRAINT "boq_breakdown_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_breakdown_id_fkey" FOREIGN KEY ("breakdown_id") REFERENCES "boq_breakdown"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_milestone_id_fkey" FOREIGN KEY ("milestone_id") REFERENCES "milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_section_breakdown" ADD CONSTRAINT "project_section_breakdown_breakdown_id_fkey" FOREIGN KEY ("breakdown_id") REFERENCES "boq_breakdown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
