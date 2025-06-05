import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ShipmentFilesService } from './files.service';
import { CreateShipmentFileDto } from './dto/create-shipment-file.dto';

interface FileUploadRequest {
  files?: CreateShipmentFileDto[];
  fileName?: string;
  fileType?: string;
  fileData?: string;
  shipmentId?: string;
}

@Controller('shipment-files')
export class ShipmentFilesController {
  constructor(private readonly filesService: ShipmentFilesService) {}

  @Post()
  async create(@Body() body: FileUploadRequest) {
    console.log('many files');
    // If body.files exists and is an array, use createMany
    if (body.files && Array.isArray(body.files)) {
      return this.filesService.createMany(body.files);
    }
    // Otherwise treat as a single file
    console.log('single file');
    const singleFile: CreateShipmentFileDto = {
      ...body,
      shipmentId: body.shipmentId ? +body.shipmentId : undefined,
    } as CreateShipmentFileDto;
    return this.filesService.create(singleFile);
  }

  @Get('shipment/:id')
  findAllByShipmentId(@Param('id') id: string) {
    return this.filesService.findAllByShipmentId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Get()
  async findAll() {
    console.log('find many');
    return this.filesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
