import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateShipmentFileDto } from './dto/create-shipment-file.dto';

@Injectable()
export class ShipmentFilesService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createFileDto: CreateShipmentFileDto) {
    const fileData = Buffer.from(createFileDto.fileData, 'base64');

    return this.dbService.shipmentFile.create({
      data: {
        shipmentId: createFileDto.shipmentId,
        fileName: createFileDto.fileName,
        fileType: createFileDto.fileType,
        fileData: fileData,
      },
    });
  }

  async createMany(createFileDtos: CreateShipmentFileDto[]) {
    return this.dbService.$transaction(
      createFileDtos.map((fileDto) => {
        const fileData = Buffer.from(fileDto.fileData, 'base64');

        return this.dbService.shipmentFile.create({
          data: {
            shipmentId: fileDto.shipmentId,
            fileName: fileDto.fileName,
            fileType: fileDto.fileType,
            fileData: fileData,
          },
        });
      }),
    );
  }

  async findAllByShipmentId(shipmentId: number) {
    return this.dbService.shipmentFile.findMany({
      where: { shipmentId },
      select: {
        id: true,
        fileName: true,
        fileType: true,
      },
    });
  }

  async findOne(id: number) {
    return this.dbService.shipmentFile.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.dbService.shipmentFile.findMany()
  }
  async remove(id: number) {
    return this.dbService.shipmentFile.delete({
      where: { id },
    });
  }
}
