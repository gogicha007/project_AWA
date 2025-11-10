import { Module } from '@nestjs/common';
import { BoqItemsService } from './boq-items.service';
import { BoqItemsController } from './boq-items.controller';

@Module({
  controllers: [BoqItemsController],
  providers: [BoqItemsService],
})
export class BoqItemsModule {}
