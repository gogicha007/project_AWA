-- CreateTable
CREATE TABLE "material_name" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dn" TEXT NOT NULL,
    "pn" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "material_name_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "material_name" ADD CONSTRAINT "material_name_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "material_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
