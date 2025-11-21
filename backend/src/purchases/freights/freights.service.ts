import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import {
  CreateFreightDTO,
  CreateFreightsBulkDTO,
} from './dto/create-freight.dto';
import { UpdateFreightDTO } from './dto/update-freight.dto';
import { Prisma } from '@prisma/client';
import { DeleteOperationResult } from 'src/common/types/operation-result_types';
import { handlePrismaErrors } from 'src/common/utils/prisma-error.util';

@Injectable()
export class FreightsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createFreightDTO: CreateFreightDTO) {
    const {
      truckNumber,
      forwarder,
      billNumber,
      billDate,
      freightRate,
      currencyId,
      shipmentId,
      userId,
    } = createFreightDTO;

    try {
      const createFreight = await this.dbService.freight.create({
        data: {
          truckNumber,
          forwarder,
          billNumber,
          billDate: billDate ? new Date(billDate) : null,
          freightRate,
          currencyId: currencyId === 0 ? null : currencyId,
          shipmentId,
          userId,
        },
      });
      return createFreight;
    } catch (error) {
      handlePrismaErrors(error);
    }
  }

  async upsertFreights(freightsData: CreateFreightsBulkDTO) {
    try {
      return await this.dbService.$transaction(async () => {
        const upsertedFreights: Array<
          Awaited<ReturnType<typeof this.dbService.freight.upsert>>
        > = [];

        for (const freightData of freightsData.freights) {
          const { id, currencyId, ...otherFields } = freightData;

          const processedData = {
            ...otherFields,
            currencyId: currencyId === 0 ? null : currencyId,
          };

          const upsertedFreight = await this.dbService.freight.upsert({
            where: { id: id || 0 },
            create: { ...processedData },
            update: { ...processedData },
          });
          if (upsertedFreight) upsertedFreights.push(upsertedFreight);
        }

        return upsertedFreights;
      });
    } catch (error) {
      handlePrismaErrors(error, 'upsert', 'freight');
    }
  }

  async findAll() {
    return this.dbService.freight.findMany({
      include: {
        invoices: true,
      },
    });
  }

  async findOne(id: number) {
    const freight = await this.dbService.freight.findUnique({
      where: { id },
      include: {
        invoices: true,
      },
    });
    if (!freight) {
      throw new NotFoundException(`Freight with ID ${id} not found`);
    }
    return freight;
  }

  async update(id: number, updateFreightDTO: UpdateFreightDTO) {
    try {
      const { currencyId, ...otherFields } = updateFreightDTO;

      const processedData = {
        ...otherFields,
        ...(currencyId !== undefined && {
          currencyId: currencyId === 0 ? null : currencyId,
        }),
      };

      const updateFreight = this.dbService.freight.update({
        where: { id },
        data: processedData,
      });
      return updateFreight;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Shipment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return this.dbService.freight.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Shipment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async removeByShipmentId(shipmentId: number) {
    const removedFreight = await this.dbService.freight.deleteMany({
      where: { shipmentId },
    });

    return {
      success: true,
      deletedCount: removedFreight.count,
      message: `Deleted ${removedFreight.count} freights for shipment ID: ${shipmentId}`,
    };
  }

  async removeByIdsArray(freightIdsArr: number[]) {
    try {
      const resultsArr: DeleteOperationResult[] = [];
      if (freightIdsArr.length > 0) {
        const resultRemovedFreights = await this.dbService.freight.deleteMany({
          where: { id: { in: freightIdsArr } },
        });
        resultsArr.push({
          success: true,
          deletedCount: resultRemovedFreights.count,
          message: `Deleted ${resultRemovedFreights.count} freights`,
        });
      }
      return resultsArr;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientValidationError
      ) {
        throw new BadRequestException(
          `Failed to delete invoices with items ${
            error instanceof Prisma.PrismaClientKnownRequestError
              ? error.code
              : error.name || 'Unknown error'
          }`,
        );
      }
    }
  }
}
