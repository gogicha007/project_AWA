import { Module } from '@nestjs/common';
import { FreightsService } from './freights.service';
import { FreightsController } from './freights.controller';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FreightsController],
  providers: [FreightsService],
  exports: [FreightsService],
})
export class FreightsModule {}
