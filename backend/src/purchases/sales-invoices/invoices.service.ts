import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { UpdateInvoiceDTO } from './dto/update-invoice.dto';
import { InvoiceItemsService } from './invoice-items/invoice-items.service';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { CreateInvoicesWithItemsDTO } from './dto/create-invoices-with-items.dto';
import { Prisma } from 'generated/prisma';
import { DeleteOperationResult } from 'src/common/types/operation-result_types';

type InvoiceWithItems = Prisma.InvoiceGetPayload<{
  include: { Items: true };
}>;

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

  async createInvoicesWithItems(invoicesData: CreateInvoicesWithItemsDTO) {
    try {
      return await this.dbService.$transaction(async () => {
        const createdInvoices: Array<InvoiceWithItems> = [];
        for (const invoiceData of invoicesData.invoices) {
          const { items, ...invoiceFields } = invoiceData;

          // Create invoice
          const createdInvoice = await this.dbService.invoice.create({
            data: {
              ...invoiceFields,
            },
          });

          // Create invoice items if any
          if (items && items.length > 0) {
            const invoiceItemsData = items.map((item) => ({
              invoiceId: createdInvoice.id,
              productId: item.productId,
              description: item.description,
              quantity: item.quantity,
              unitId: item.unitId,
              unitPrice: item.unitPrice,
              total: item.total,
            }));

            await this.dbService.invoiceItem.createMany({
              data: invoiceItemsData,
            });
          }

          // Get the invoice with items
          const invoiceWithItems = await this.dbService.invoice.findUnique({
            where: { id: createdInvoice.id },
            include: { Items: true },
          });

          if (invoiceWithItems) {
            createdInvoices.push({ ...invoiceWithItems });
          } else {
            throw new NotFoundException(
              `Created invoice with ID ${createdInvoice.id} not found`,
            );
          }
        }

        return createdInvoices;
      });
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

      throw new BadRequestException('Failed to create invoices with items');
    }
  }

  async upsertInvoicesWithItems(invoicesData: CreateInvoicesWithItemsDTO) {
    try {
      return await this.dbService.$transaction(
        async () => {
          const upsertedInvoices: Array<InvoiceWithItems> = [];

          for (const invoiceData of invoicesData.invoices) {
            const { items, ...invoiceFields } = invoiceData;

            const { id, ...invoiceFieldsWithoutId } = invoiceFields;

            // Upsert invoice
            const upsertedInvoice = await this.dbService.invoice.upsert({
              where: { id: id || 0 },
              create: { ...invoiceFieldsWithoutId },
              update: { ...invoiceFieldsWithoutId },
              include: { Items: true },
            });

            // Upsert invoice items if any
            if (items && items.length > 0) {
              for (const item of items) {
                const { id: itemId, invoiceId, ...itemFields } = item;
                await this.dbService.invoiceItem.upsert({
                  where: { id: itemId || 0 },
                  create: {
                    invoiceId: invoiceId || upsertedInvoice.id,
                    ...itemFields,
                  },
                  update: {
                    invoiceId: invoiceId || upsertedInvoice.id,
                    ...itemFields,
                  },
                });
              }
              const refreshedInvoice = await this.dbService.invoice.findUnique({
                where: { id: upsertedInvoice.id },
                include: { Items: true },
              });

              if (refreshedInvoice) {
                upsertedInvoices.push(refreshedInvoice);
              }
            } else {
              upsertedInvoices.push(upsertedInvoice);
            }
          }

          return upsertedInvoices;
        },
        {
          timeout: 10000,
        },
      );
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new NotFoundException('Invoice already exists');
      }

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2009'
      ) {
        throw new BadRequestException('Invalid input data');
      }

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Foreign key constraint failed on the field: {field_name}',
        );
      }

      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(
          `Failed to upsert invoices with items ${error.code}`,
        );
      }

      throw new BadRequestException('Failed to upsert invoices with items');
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

  async removeOne(id: number) {
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

  async removeByIdsArray(invoiceIdsArr: number[]) {
    try {
      const resultsArr: DeleteOperationResult[] = [];
      if (invoiceIdsArr.length > 0) {
        const resultRemoveItems =
          await this.invoiceItemsService.removeAllByInvoiceIdsArray(
            invoiceIdsArr,
          );

        resultsArr.push(resultRemoveItems);
        const resultRemoveIncoices = await this.dbService.invoice.deleteMany({
          where: { id: { in: invoiceIdsArr } },
        });
        resultsArr.push({
          success: true,
          deletedCount: resultRemoveIncoices.count,
          message: `Deleted ${resultRemoveIncoices.count} invoices`,
        });
      }
      return resultsArr;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientRustPanicError ||
        error instanceof PrismaClientInitializationError ||
        error instanceof PrismaClientValidationError
      ) {
        throw new BadRequestException(
          `Failed to delete invoices with items ${
            error instanceof PrismaClientKnownRequestError
              ? error.code
              : error.name || 'Unknown error'
          }`,
        );
      }
    }
  }

  async removeByShipmentId(shipmentId: number) {
    try {
      const invoices = await this.dbService.invoice.findMany({
        where: { shipmentId },
        select: { id: true },
      });

      const invoiceIds = invoices.map((invoice) => invoice.id);

      if (invoiceIds.length > 0) {
        await this.dbService.invoiceItem.deleteMany({
          where: { invoiceId: { in: invoiceIds } },
        });
      }

      // Then delete the invoices
      return this.dbService.invoice.deleteMany({
        where: { shipmentId },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Invoice with shipment ID ${shipmentId} not found`,
        );
      }
      throw error;
    }
  }
}
