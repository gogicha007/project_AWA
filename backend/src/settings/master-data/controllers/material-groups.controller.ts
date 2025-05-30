import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaterialGroupsService } from '../services/material-groups.service';
import { CreateMaterialGroupDTO } from '../dto/createMaterialGroup.dto';

@Controller('material-groups')
export class MaterialGroupsController {
  constructor(private readonly materialGroupsService: MaterialGroupsService) {}

  @Post()
  create(@Body() createMaterialGroupDTO: CreateMaterialGroupDTO) {
    return this.materialGroupsService.create(createMaterialGroupDTO);
  }

  @Get()
  findAll() {
    return this.materialGroupsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMaterialGroupDTO: CreateMaterialGroupDTO,
  ) {
    console.log('controller', id);
    return this.materialGroupsService.update(+id, updateMaterialGroupDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.materialGroupsService.remove(+id);
  }
}
