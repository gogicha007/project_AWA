import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ShipmentFilesService } from './files.service';
import { CreateShipmentFileDto } from './dto/create-shipment-file.dto';

@Controller('shipment-files')
export class ShipmentFilesController {
  constructor(private readonly filesService: ShipmentFilesService) {}

  @Post()
  create(@Body() createFileDto: CreateShipmentFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get('shipment/:id')
  findAllByShipmentId(@Param('id') id: string) {
    return this.filesService.findAllByShipmentId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
