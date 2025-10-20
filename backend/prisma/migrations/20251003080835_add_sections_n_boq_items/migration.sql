-- CreateTable
CREATE TABLE "boq_items" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "item_number" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "quantity" DECIMAL(12,4),
    "unit_price" DECIMAL(12,2),
    "total_price" DECIMAL(15,2),
    "parent_item_id" INTEGER,
    "level" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "boq_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_sections" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "section_code" TEXT NOT NULL,
    "section_name" TEXT NOT NULL,
    "seciton_type" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "project_sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "project_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_parent_item_id_fkey" FOREIGN KEY ("parent_item_id") REFERENCES "boq_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boq_items" ADD CONSTRAINT "boq_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
