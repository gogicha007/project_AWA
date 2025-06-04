/*
  Warnings:

  - Added the required column `file_name` to the `shipment_file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipment_file" ADD COLUMN     "file_data" BYTEA,
ADD COLUMN     "file_name" TEXT NOT NULL,
ALTER COLUMN "file_path" DROP NOT NULL,
ALTER COLUMN "file_type" DROP NOT NULL;
