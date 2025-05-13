import { Module } from '@nestjs/common';
import { MaterialGroupsService } from './services/material-groups.service';
import { MaterialGroupsController } from './controllers/material-groups.controller';
import { DatabaseService } from 'src/database/dadabase/database.service';

@Module({
  controllers: [MaterialGroupsController],
  providers: [MaterialGroupsService, DatabaseService],
  exports: [MaterialGroupsService],
})
export class MaterialGroupsModule {}
