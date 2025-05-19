import { Module } from '@nestjs/common';
import { MaterialGroupsService } from './services/material-groups.service';
import { MaterialGroupsController } from './controllers/material-groups.controller';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { UnitsController } from './controllers/units.controller';
import { UnitsService } from './services/units.service';

@Module({
  controllers: [MaterialGroupsController, UnitsController],
  providers: [MaterialGroupsService, UnitsService, DatabaseService],
  exports: [MaterialGroupsService, UnitsService],
})
export class MasterDataModule {}
