import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaterialNamesService } from '../services/material-names.service';
import { MaterialNameDTO } from '../dto/materialNames.dto';

@Controller('material-names')
export class MaterialNamesController {
  constructor(private readonly materialNamesService: MaterialNamesService) {}

  @Post()
  create(@Body() materialNameDTO: MaterialNameDTO) {
    return this.materialNamesService.create(materialNameDTO);
  }

  @Get()
  findAll() {
    return this.materialNamesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMaterialNameDTO: MaterialNameDTO,
  ) {
    return this.materialNamesService.update(+id, updateMaterialNameDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.materialNamesService.remove(+id);
  }
}
