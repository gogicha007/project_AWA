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
import {
  CreateBoqSectionBulkDTO,
  CreateBoqSectionDto,
} from './dto/create-boq-section.dto';
import { UpdateBoqSectionDto } from './dto/update-boq-section.dto';

@Controller('boq-sections')
export class BoqSectionsController {
  constructor(private readonly boqSectionsService: BoqSectionsService) {}

  @Post()
  createSectoin(@Body() createBoqSectionDTO: CreateBoqSectionDto) {
    return this.boqSectionsService.createBoqSection(createBoqSectionDTO);
  }

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

  @Get('/project/:id')
  async findAllByProjectId(@Param('id') id: string) {
    return this.boqSectionsService.getAllByProjectId(+id)
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

  @Delete('delete/bulk')
  async removeAllByIdsArray(
    @Body() { ids: sectionIdsArray }: { ids: number[] },
  ) {
    return this.boqSectionsService.removeByIdsArray(sectionIdsArray);
  }
}
