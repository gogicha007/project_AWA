import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UnitsService } from '../services/units.service';
import { UnitDTO } from '../dto/units.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  create(@Body() unitDTO: UnitDTO) {
    return this.unitsService.create(unitDTO);
  }

  @Get()
  findAll() {
    return this.unitsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUnitDTO: UnitDTO) {
    console.log('controller', id);
    return this.unitsService.update(+id, updateUnitDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.unitsService.remove(+id);
  }
}
