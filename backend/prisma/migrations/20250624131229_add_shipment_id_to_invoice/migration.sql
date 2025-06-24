/*
  Warnings:

  - You are about to drop the `shipment_invoice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shipment_id` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "freight" DROP CONSTRAINT "freight_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "shipment_invoice" DROP CONSTRAINT "shipment_invoice_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "shipment_invoice" DROP CONSTRAINT "shipment_invoice_shipment_id_fkey";

-- AlterTable
ALTER TABLE "freight" ALTER COLUMN "forwarder" DROP NOT NULL,
ALTER COLUMN "bill_number" DROP NOT NULL,
ALTER COLUMN "bill_date" DROP NOT NULL,
ALTER COLUMN "freight_rate" DROP NOT NULL,
ALTER COLUMN "currency_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "shipment_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "shipment_invoice";

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight" ADD CONSTRAINT "freight_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
