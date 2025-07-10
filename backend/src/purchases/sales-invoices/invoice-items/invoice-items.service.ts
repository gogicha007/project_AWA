import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateInvoiceItemDTO } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDTO } from './dto/update-invoice-item.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class InvoiceItemsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createInvoiceItemDTO: CreateInvoiceItemDTO) {
    try {
      return this.dbService.invoiceItem.create({
        data: createInvoiceItemDTO,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new NotFoundException('Shipment already exists');

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

  async update(updateInvoiceItemDTO: UpdateInvoiceItemDTO, id: number) {
    try {
      return this.dbService.invoiceItem.update({
        where: { id },
        data: updateInvoiceItemDTO,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      throw error;
    }
  }

  async findAll() {
    try {
      return this.dbService.invoiceItem.findMany();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(
          `Failed to fetch invoice items, error code: ${error.code}`,
        );
      }
      throw error;
    }
  }

  async findAllByInvoiceId(invoiceId: number) {
    try {
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
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch invoice items');
    }
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

  async removeAllByInvoiceId(invoiceId: number) {
    try {
      const result = await this.dbService.invoiceItem.deleteMany({
        where: { invoiceId },
      });
      return {
        success: true,
        deletedCount: result.count,
        message: `Deleted ${result.count} invoice items for invoice ID: ${invoiceId}`,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Items with for invoice ID ${invoiceId} not found`,
        );
      }
    }
  }

  async removeAllByInvoiceIdsArray(invoiceIds: number[]) {
    try {
      const result = await this.dbService.invoiceItem.deleteMany({
        where: { invoiceId: { in: invoiceIds } },
      });
      return {
        success: true,
        deletedCount: result.count,
        message: `Deleted ${result.count} invoice items for invoice IDs: ${invoiceIds.join(', ')}`,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Items for invoice IDs ${invoiceIds.join(', ')} not found`,
        );
      }
      throw error;
    }
  }

  async removeAllItemsFromArray(itemIds: number[]) {
    try {
      const result = await this.dbService.invoiceItem.deleteMany({
        where: { id: { in: itemIds } },
      });
      return {
        success: true,
        deletedCount: result.count,
        message: `Deleted ${result.count} invoice items for IDs: ${itemIds.join(', ')}`,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Items with IDs ${itemIds.join(', ')} not found`,
        );
      }
      throw error;
    }
  }
}
