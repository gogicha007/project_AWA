import { Module } from '@nestjs/common';
import { ShipmentFilesController } from './files.controller';
import { ShipmentFilesService } from './files.service';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShipmentFilesController],
  providers: [ShipmentFilesService],
  exports: [ShipmentFilesService],
})
export class ShipmentFilesModule {}
