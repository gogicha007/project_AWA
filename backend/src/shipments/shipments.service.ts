import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';
import { ShipmentFilesService } from './files/files.service';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly shipmentFilesService: ShipmentFilesService,
  ) {}

  async create(createShipmentDto: CreateShipmentDTO) {
    const { alias, status, declaration_number, declaration_date, userId } =
      createShipmentDto;

    const shipment = await this.dbService.shipment.create({
      data: {
        alias,
        status,
        declaration_number,
        declaration_date: declaration_date
          ? new Date(declaration_date)
          : undefined,
        userId,
      },
      include: {
        invoices: true,
        files: false,
      },
    });

    return shipment;
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
    return this.dbService.shipment.update({
      where: { id },
      data: updateShipmentDto,
      include: {
        invoices: true,
        files: false,
      },
    });
  }

  async remove(id: number) {
    await this.shipmentFilesService.removeByShipmentId(id);

    return this.dbService.shipment.delete({
      where: { id },
    });
  }
}
