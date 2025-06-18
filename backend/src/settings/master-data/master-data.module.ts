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
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';

@Module({
  controllers: [
    MaterialGroupsController,
    MaterialTypesController,
    MaterialNamesController,
    UnitsController,
    CurrencyController,
  ],
  providers: [
    MaterialGroupsService,
    MaterialTypesService,
    MaterialNamesService,
    UnitsService,
    CurrencyService,
    DatabaseService,
  ],
  exports: [
    MaterialGroupsService,
    MaterialTypesService,
    MaterialNamesService,
    UnitsService,
    CurrencyService,
  ],
})
export class MasterDataModule {}
