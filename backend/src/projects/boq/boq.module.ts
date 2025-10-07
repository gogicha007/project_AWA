import { Module } from '@nestjs/common';
import { BoqService } from './boq.service';
import { BoqController } from './boq.controller';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BoqController],
  providers: [BoqService],
})
export class BoqModule {}
