import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';
import { ShipmentsService } from './shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  async create(@Body() createShipmentDto: CreateShipmentDTO) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get()
  async findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDTO,
  ) {
    return this.shipmentsService.update(+id, updateShipmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shipmentsService.remove(+id);
  }
}
