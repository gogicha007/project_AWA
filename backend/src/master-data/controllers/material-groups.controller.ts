import { Controller, Get, Post, Body } from '@nestjs/common';
import { MaterialGroupsService } from '../services/material-groups.service';
import { CreateMaterualGroupDTO } from '../dto/createMaterialGroup.dto';
CreateMaterualGroupDTO;

@Controller('material-groups')
export class MaterialGroupsController {
  constructor(private readonly materialGroupsService: MaterialGroupsService) {}

  @Post()
  create(@Body() createMaterialGroupDTO: CreateMaterualGroupDTO) {
    return this.materialGroupsService.create(createMaterialGroupDTO);
  }

  @Get()
  findAll() {
    return this.materialGroupsService.findAll();
  }
}
