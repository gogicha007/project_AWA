import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { ShipmentFilesModule } from './files/files.module';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [ShipmentFilesModule, DatabaseModule],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
