import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { MaterialTypesService } from './services/material-types.service';
import { MaterialTypesController } from './controllers/material-types.controller';
import { MaterialGroupsService } from './services/material-groups.service';
import { MaterialGroupsController } from './controllers/material-groups.controller';
import { MaterialNamesService } from './services/material-names.service';
import { MaterialNamesController } from './controllers/material-names.controller';
import { UnitsController } from './controllers/units.controller';
import { UnitsService } from './services/units.service';

@Module({
  controllers: [
    MaterialGroupsController,
    MaterialTypesController,
    MaterialNamesController,
    UnitsController,
  ],
  providers: [
    MaterialGroupsService,
    MaterialTypesService,
    MaterialNamesService,
    UnitsService,
    DatabaseService,
  ],
  exports: [
    MaterialGroupsService,
    MaterialTypesService,
    MaterialNamesService,
    UnitsService,
  ],
})
export class MasterDataModule {}
