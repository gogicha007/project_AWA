-- CreateTable
CREATE TABLE "village" (
    "id" SERIAL NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ge" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "village_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_material_need" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "requiredAmount" DECIMAL(65,30) NOT NULL,
    "villageId" INTEGER NOT NULL,

    CONSTRAINT "water_material_need_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineProgress" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "requiredAmount" DECIMAL(65,30) NOT NULL,
    "unitId" INTEGER NOT NULL,
    "villageId" INTEGER NOT NULL,

    CONSTRAINT "PipelineProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "water_material_need" ADD CONSTRAINT "water_material_need_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "material_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_material_need" ADD CONSTRAINT "water_material_need_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineProgress" ADD CONSTRAINT "PipelineProgress_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "material_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineProgress" ADD CONSTRAINT "PipelineProgress_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineProgress" ADD CONSTRAINT "PipelineProgress_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
