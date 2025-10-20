// backend/src/projects/boq/boq.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoqService } from './boq.service';
import type { Express } from 'express';
import { CreateProjectSectionDto } from './dto/create-projectSection.dto';
import { UpdateProjectSectionDto } from './dto/update-projectSection.dto';
import { CreateBoqItemDto } from './dto/create-boqItem.dto';
import { UpdateBoqItemDto } from './dto/update-boqItem.dto';
import { ImportOptions } from './boq.service'; // Import the ImportOptions interface

@Controller('projects/:projectId/boq')
export class BoqController {
  constructor(private readonly boqService: BoqService) {}

  // Project Sections endpoints
  @Get('sections')
  async getProjectSections(@Param('projectId') projectId: number) {
    return this.boqService.getProjectSections(projectId);
  }

  @Post('sections')
  async createProjectSection(
    @Param('projectId') projectId: number,
    @Body() createSectionDto: CreateProjectSectionDto,
  ) {
    return this.boqService.createProjectSection(projectId, createSectionDto);
  }

  @Put('sections/:sectionId')
  async updateProjectSection(
    @Param('sectionId') sectionId: number,
    @Body() updateSectionDto: UpdateProjectSectionDto,
  ) {
    return this.boqService.updateProjectSection(sectionId, updateSectionDto);
  }

  @Delete('sections/:sectionId')
  async deleteProjectSection(@Param('sectionId') sectionId: number) {
    return this.boqService.deleteProjectSection(sectionId);
  }

  // BoQ Items endpoints
  @Get('items')
  async getBoqItems(
    @Param('projectId') projectId: number,
    @Query('sectionId') sectionId?: number,
    @Query('breakdownId') breakdownId?: number,
  ) {
    return this.boqService.getBoqItems(projectId, { sectionId, breakdownId });
  }

  @Post('items')
  async createBoqItem(
    @Param('projectId') projectId: number,
    @Body() createItemDto: CreateBoqItemDto,
  ) {
    return this.boqService.createBoqItem(projectId, createItemDto);
  }

  @Put('items/:itemId')
  async updateBoqItem(
    @Param('itemId') itemId: number,
    @Body() updateItemDto: UpdateBoqItemDto,
  ) {
    return this.boqService.updateBoqItem(itemId, updateItemDto);
  }

  @Delete('items/:itemId')
  async deleteBoqItem(@Param('itemId') itemId: number) {
    return this.boqService.deleteBoqItem(itemId);
  }

  // Import functionality
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importBoq(
    @Param('projectId') projectId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('importOptions') importOptions: string,
  ) {
    const options: ImportOptions = JSON.parse(importOptions) as ImportOptions;
    return this.boqService.importBoqFromFile(projectId, file, options);
  }

  @Get('export')
  exportBoq(
    @Param('projectId') projectId: number,
    @Query('format') format: 'excel' | 'csv' = 'excel',
  ) {
    return this.boqService.exportBoq(projectId, format);
  }
}
