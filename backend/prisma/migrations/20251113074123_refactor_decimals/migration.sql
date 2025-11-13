/*
  Warnings:

  - You are about to alter the column `freight_rate` on the `freight` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `total_amount` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `unit_price` on the `invoice_item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `total` on the `invoice_item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "freight" ALTER COLUMN "freight_rate" SET DATA TYPE DECIMAL(15,2);

-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "total_amount" SET DATA TYPE DECIMAL(15,2);

-- AlterTable
ALTER TABLE "invoice_item" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(15,2);
