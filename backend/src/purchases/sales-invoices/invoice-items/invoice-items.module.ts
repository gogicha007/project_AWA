import { Module } from '@nestjs/common';
import { InvoiceItemsController } from './invoice-items.controller';
import { InvoiceItemsService } from './invoice-items.service';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService],
  exports: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
