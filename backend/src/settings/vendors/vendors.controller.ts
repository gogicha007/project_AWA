import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorDTO } from './vendors.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  create(@Body() vendorDTO: VendorDTO) {
    return this.vendorsService.create(vendorDTO);
  }

  @Get()
  findAll() {
    return this.vendorsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVendor: VendorDTO) {
    return this.vendorsService.update(+id, updateVendor);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vendorsService.remove(+id);
  }
}
