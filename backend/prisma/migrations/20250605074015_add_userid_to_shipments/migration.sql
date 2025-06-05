/*
  Warnings:

  - Added the required column `user_id` to the `shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipment" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "shipment" ADD CONSTRAINT "shipment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
