import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoqSectionsService } from './boq-sections.service';
import { CreateBoqSectionBulkDTO } from './dto/create-boq-section.dto';
import { UpdateBoqSectionDto } from './dto/update-boq-section.dto';

@Controller('boq-sections')
export class BoqSectionsController {
  constructor(private readonly boqSectionsService: BoqSectionsService) {}

  @Post('/bulk')
  createBulk(@Body() createBoqSectionBulkDto: CreateBoqSectionBulkDTO) {
    return this.boqSectionsService.upsertBoqSections(createBoqSectionBulkDto);
  }

  @Get()
  findAll() {
    return this.boqSectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boqSectionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoqSectionDto: UpdateBoqSectionDto,
  ) {
    return this.boqSectionsService.update(+id, updateBoqSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boqSectionsService.remove(+id);
  }
}
