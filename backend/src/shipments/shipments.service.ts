import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';
import { ShipmentFilesService } from './files/files.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly shipmentFilesService: ShipmentFilesService,
  ) {}

  async create(createShipmentDto: CreateShipmentDTO) {
    const { alias, status, declaration_number, declaration_date, userId } =
      createShipmentDto;
    try {
      const shipment = await this.dbService.shipment.create({
        data: {
          alias,
          status,
          declaration_number,
          declaration_date: declaration_date
            ? new Date(declaration_date)
            : null,
          userId,
        },
        include: {
          invoices: true,
          files: false,
        },
      });

      return shipment;
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

  async findAll() {
    return this.dbService.shipment.findMany({
      include: {
        invoices: true,
        files: false,
      },
    });
  }

  async findOne(id: number) {
    const shipment = await this.dbService.shipment.findUnique({
      where: { id },
      include: {
        invoices: true,
        files: true,
      },
    });
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async update(id: number, updateShipmentDto: UpdateShipmentDTO) {
    try {
      const shipment = this.dbService.shipment.update({
        where: { id },
        data: updateShipmentDto,
        include: {
          invoices: true,
          files: false,
        },
      });
      return shipment;
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
      await this.shipmentFilesService.removeByShipmentId(id);

      return this.dbService.shipment.delete({
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
