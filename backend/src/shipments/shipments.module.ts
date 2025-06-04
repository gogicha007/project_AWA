import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService, DatabaseService],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
