-- CreateTable
CREATE TABLE "project_location" (
    "project_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "project_location_pkey" PRIMARY KEY ("project_id","location_id")
);

-- AddForeignKey
ALTER TABLE "project_location" ADD CONSTRAINT "project_location_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_location" ADD CONSTRAINT "project_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
