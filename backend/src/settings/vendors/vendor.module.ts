import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';

@Module({
  controllers: [VendorsController],
  providers: [VendorsService, DatabaseService],
  exports: [VendorsService],
})
export class VendorsModule {}
