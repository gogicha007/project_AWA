import { Module } from '@nestjs/common';
import { BoqSectionsService } from './boq-sections.service';
import { BoqSectionsController } from './boq-sections.controller';
import { DatabaseModule } from 'src/database/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BoqSectionsController],
  providers: [BoqSectionsService],
})
export class BoqSectionsModule {}
