import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDTO } from './dto/create-invoice-item.dto';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly itemsService: InvoiceItemsService) {}

  @Post()
  async create(@Body() createItemDTO: CreateInvoiceItemDTO) {
    return this.itemsService.create(createItemDTO);
  }

  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Get('invoice/:id')
  async findAllByInvoiceId(@Param('id') id: string) {
    return this.itemsService.findAllByInvoiceId(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

  @Delete('invoice/:id')
  removeMany(@Param('id') id: string) {
    return this.itemsService.removeAllByInvoiceId(+id);
  }
}
