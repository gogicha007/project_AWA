import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoiceItemsModule } from './invoice-items/invoice-items.module';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [InvoiceItemsModule, DatabaseModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
