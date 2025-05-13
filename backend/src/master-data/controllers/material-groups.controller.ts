import { Controller, Get } from '@nestjs/common';
import { MaterialGroupsService } from '../services/material-groups.service';

@Controller('material-groups')
export class MaterialGroupsController {
  constructor(private readonly materialGroupsService: MaterialGroupsService) {}

  @Get()
  findAll() {
    return this.materialGroupsService.findAll();
  }
}
