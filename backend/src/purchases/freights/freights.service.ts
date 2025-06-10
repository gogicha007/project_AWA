import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateFreightDTO } from './dto/create-freight.dto';
import { UpdateFreightDTO } from './dto/update-freight.dto';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

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
      isArrived,
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
          currencyId,
          isArrived,
          shipmentId,
          userId,
        },
      });
      return createFreight;
    } catch (error) {
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
      const updateFreight = this.dbService.freight.update({
        where: { id },
        data: updateFreightDTO,
      });
      return updateFreight;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
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
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Shipment with ID ${id} not found`);
      }
      throw error;
    }
  }
}
