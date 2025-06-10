import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { UpdateInvoiceDTO } from './dto/update-invoice.dto';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) {}

  @Post()
  async create(@Body() createInvoiceDTO: CreateInvoiceDTO) {
    return this.invoiceService.create(createInvoiceDTO);
  }

  @Get()
  async findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDTO: UpdateInvoiceDTO,
  ) {
    return this.invoiceService.update(+id, updateInvoiceDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
