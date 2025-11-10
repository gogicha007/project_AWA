import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoqItemsService } from './boq-items.service';
import { CreateBoqItemDto } from './dto/create-boq-item.dto';
import { UpdateBoqItemDto } from './dto/update-boq-item.dto';

@Controller('boq-items')
export class BoqItemsController {
  constructor(private readonly boqItemsService: BoqItemsService) {}

  @Post()
  create(@Body() createBoqItemDto: CreateBoqItemDto) {
    return this.boqItemsService.create(createBoqItemDto);
  }

  @Get()
  findAll() {
    return this.boqItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boqItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoqItemDto: UpdateBoqItemDto) {
    return this.boqItemsService.update(+id, updateBoqItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boqItemsService.remove(+id);
  }
}
