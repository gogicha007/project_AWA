import { Module } from '@nestjs/common';
import { BoqSectionsService } from './boq-sections.service';
import { BoqSectionsController } from './boq-sections.controller';

@Module({
  controllers: [BoqSectionsController],
  providers: [BoqSectionsService],
})
export class BoqSectionsModule {}
