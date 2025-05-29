/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `material_group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `material_name` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `material_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_group_name_key" ON "material_group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "material_name_name_key" ON "material_name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "material_type_type_key" ON "material_type"("type");
