import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { DatabaseService } from 'src/database/database/database.service';
import { handlePrismaErrors } from 'src/common/utils/prisma-error.util';

@Injectable()
export class LocationsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
      const location = await this.dbService.location.create({
        data: createLocationDto,
      });
      return {
        success: true,
        message: 'Location created successfully',
        data: location,
      };
    } catch (error) {
      handlePrismaErrors(error);
    }
  }

  async findAll() {
    try {
      const locations = await this.dbService.location.findMany();
      return { success: true, data: locations };
    } catch (error) {
      handlePrismaErrors(error);
    }
  }

  async findOne(id: number) {
    try {
      const location = await this.dbService.location.findUnique({
        where: { id },
      });
      return { success: true, data: location };
    } catch (error) {
      handlePrismaErrors(error);
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const location = await this.dbService.location.update({
        where: { id },
        data: updateLocationDto,
      });
      return {
        success: true,
        message: 'Location updated successfully',
        data: location,
      };
    } catch (error) {
      handlePrismaErrors(error);
    }
  }

  async remove(id: number) {
    try {
      await this.dbService.location.delete({
        where: { id },
      });
      return {
        success: true,
        message: `Location with id ${id} removed successfully`,
      };
    } catch (error) {
      handlePrismaErrors(error);
    }
  }
}
