import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { ShipmentFilesModule } from './files/files.module';
import { InvoicesModule } from 'src/purchases/sales-invoices/invoices.module';
import { FreightsModule } from 'src/purchases/freights/freights.module';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [
    InvoicesModule,
    FreightsModule,
    ShipmentFilesModule,
    DatabaseModule,
  ],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
