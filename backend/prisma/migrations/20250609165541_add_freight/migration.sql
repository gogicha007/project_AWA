-- CreateTable
CREATE TABLE "freight" (
    "id" SERIAL NOT NULL,
    "truck_number" TEXT NOT NULL,
    "forwarder" TEXT NOT NULL,
    "bill_number" TEXT NOT NULL,
    "bill_date" TIMESTAMP(3) NOT NULL,
    "freight_rate" DECIMAL(65,30) NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "shipment_id" INTEGER NOT NULL,
    "is_arrived" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "freight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freight_invoice" (
    "freight_id" INTEGER NOT NULL,
    "invoice_id" INTEGER NOT NULL,

    CONSTRAINT "freight_invoice_pkey" PRIMARY KEY ("freight_id","invoice_id")
);

-- AddForeignKey
ALTER TABLE "freight" ADD CONSTRAINT "freight_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight" ADD CONSTRAINT "freight_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight" ADD CONSTRAINT "freight_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_invoice" ADD CONSTRAINT "freight_invoice_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_invoice" ADD CONSTRAINT "freight_invoice_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
