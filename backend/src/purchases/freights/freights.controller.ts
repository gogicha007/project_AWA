import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateFreightDTO } from './dto/create-freight.dto';
import { UpdateFreightDTO } from './dto/update-freight.dto';
import { CreateFreightsBulkDTO } from './dto/create-freight.dto';
import { FreightsService } from './freights.service';

@Controller('freights')
export class FreightsController {
  constructor(private readonly freightsService: FreightsService) {}

  @Post()
  async create(@Body() createFreightDTO: CreateFreightDTO) {
    return this.freightsService.create(createFreightDTO);
  }

  @Post('/bulk')
  async createBulk(@Body() createFreightsBulkDTO: CreateFreightsBulkDTO) {
    return this.freightsService.upsertFreights(createFreightsBulkDTO);
  }

  @Get()
  async findAll() {
    return this.freightsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.freightsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFreightDTO: UpdateFreightDTO,
  ) {
    return this.freightsService.update(+id, updateFreightDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.freightsService.remove(+id);
  }

  // @Delete('delete/bulk')
  // async removeAllByIdsArray(
  //   @Body() { ids: freightIdsArray }: { ids: Array<number> },
  // ) {
  //   return `freight ids`;
  // }
}
