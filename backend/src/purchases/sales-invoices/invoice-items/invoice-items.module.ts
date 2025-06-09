import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateInvoiceItemDTO } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDTO } from './dto/update-invoice-item.dto';

@Injectable()
export class InvoiceItemsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createInvoiceItemDTO: CreateInvoiceItemDTO) {
    return this.dbService.invoiceItem.create({
      data: createInvoiceItemDTO,
    });
  }

  async update(updateInvoiceItemDTO: UpdateInvoiceItemDTO, id: number) {
    return this.dbService.invoiceItem.update({
      where: { id },
      data: updateInvoiceItemDTO,
    });
  }

  async findAll() {
    return this.dbService.invoiceItem.findMany();
  }

  async findAllByInvoiceId(invoiceId: number) {
    return this.dbService.invoiceItem.findMany({
      where: { invoiceId },
      select: {
        id: true,
        productId: true,
        description: true,
        quantity: true,
        unitId: true,
        unitPrice: true,
      },
    });
  }

  async findOne(id: number) {
    return this.dbService.invoiceItem.findUnique({
      where: { id },
      select: {
        id: true,
        productId: true,
        description: true,
        quantity: true,
        unitId: true,
        unitPrice: true,
      },
    });
  }

  async remove(id: number) {
    return this.dbService.invoiceItem.delete({
      where: { id },
    });
  }

  async removeByInvoiceId(invoiceId: number) {
    return this.dbService.invoiceItem.deleteMany({
      where: { invoiceId },
    });
  }
}
