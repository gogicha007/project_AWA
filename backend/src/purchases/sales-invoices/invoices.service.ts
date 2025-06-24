import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { UpdateInvoiceDTO } from './dto/update-invoice.dto';
import { InvoiceItemsService } from './invoice-items/invoice-items.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly invoiceItemsService: InvoiceItemsService,
  ) {}

  async create(createInvoiceDTO: CreateInvoiceDTO) {
    const {
      vendorId,
      invoiceNumber,
      invoiceDate,
      totalAmount,
      currencyId,
      shipmentId,
      isArrived,
      userId,
    } = createInvoiceDTO;
    try {
      const invoice = await this.dbService.invoice.create({
        data: {
          vendorId,
          invoiceNumber,
          invoiceDate,
          totalAmount,
          currencyId,
          isArrived,
          shipmentId,
          userId,
        },
      });

      return invoice;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new NotFoundException('Invoice already exists');

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2009'
      )
        throw new BadRequestException('Invalid input data');

      if (error instanceof PrismaClientKnownRequestError)
        throw new BadRequestException(`Database error: ${error.message}`);

      throw new BadRequestException('Invalid input data');
    }
  }

  async findAll() {
    return this.dbService.invoice.findMany();
  }

  async findOne(id: number) {
    const invoice = await this.dbService.invoice.findUnique({
      where: { id },
      include: {
        Items: true,
        Freights: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async update(id: number, updateInvoiceDTO: UpdateInvoiceDTO) {
    try {
      const invoice = this.dbService.invoice.update({
        where: { id },
        data: updateInvoiceDTO,
      });
      return invoice;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.invoiceItemsService.removeAllByInvoiceId(id);

      return this.dbService.invoice.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      throw error;
    }
  }
}
