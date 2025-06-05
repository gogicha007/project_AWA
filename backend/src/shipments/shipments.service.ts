import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto'; // Uncomment if you have update DTO

@Injectable()
export class ShipmentsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createShipmentDto: CreateShipmentDTO) {
    const {
      alias,
      status,
      declaration_number,
      declaration_date,
      invoiceIds,
      fileIds,
      userId,
    } = createShipmentDto;

    const shipment = await this.dbService.shipment.create({
      data: {
        alias,
        status,
        declaration_number,
        declaration_date: declaration_date
          ? new Date(declaration_date)
          : undefined,
        invoices: invoiceIds
          ? {
              create: invoiceIds.map((invoiceId) => ({
                invoice: { connect: { id: invoiceId } },
              })),
            }
          : undefined,
        files: fileIds
          ? {
              connect: fileIds.map((fileId) => ({ id: fileId })),
            }
          : undefined,
        userId,
      },
      include: {
        invoices: true,
        files: true,
      },
    });

    return shipment;
  }

  async findAll() {
    return this.dbService.shipment.findMany({
      include: {
        invoices: true,
        files: true,
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
    // Implement update logic as needed
    return this.dbService.shipment.update({
      where: { id },
      data: updateShipmentDto,
      include: {
        invoices: true,
        files: true,
      },
    });
  }

  async remove(id: number) {
    return this.dbService.shipment.delete({
      where: { id },
    });
  }
}
