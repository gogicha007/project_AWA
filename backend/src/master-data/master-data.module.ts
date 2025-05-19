import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { MaterialTypesService } from './services/material-types.service';
import { MaterialTypesController } from './controllers/material-types';
import { MaterialGroupsService } from './services/material-groups.service';
import { MaterialGroupsController } from './controllers/material-groups.controller';
import { UnitsController } from './controllers/units.controller';
import { UnitsService } from './services/units.service';

@Module({
  controllers: [
    MaterialGroupsController,
    MaterialTypesController,
    UnitsController,
  ],
  providers: [
    MaterialGroupsService,
    MaterialTypesService,
    UnitsService,
    DatabaseService,
  ],
  exports: [MaterialGroupsService, MaterialTypesService, UnitsService],
})
export class MasterDataModule {}
