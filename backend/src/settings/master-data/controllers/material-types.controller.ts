import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaterialTypesService } from '../services/material-types.service';
import { MaterialTypeDTO } from '../dto/materialTypes.dto';

@Controller('material-types')
export class MaterialTypesController {
  constructor(private readonly materialTypesService: MaterialTypesService) {}

  @Post()
  create(@Body() materialTypeDTO: MaterialTypeDTO) {
    return this.materialTypesService.create(materialTypeDTO);
  }

  @Get()
  findAll() {
    return this.materialTypesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMaterialTypeDTO: MaterialTypeDTO,
  ) {
    return this.materialTypesService.update(+id, updateMaterialTypeDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.materialTypesService.remove(+id);
  }
}
