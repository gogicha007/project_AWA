import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { VendorDTO } from './vendors.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class VendorsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(payload: VendorDTO) {
    try {
      const vendor = await this.dbService.vendor.create({
        data: payload,
        select: {
          alias: true,
        },
      });
      return vendor;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new NotFoundException('Vendor already exists');

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
    try {
      const allVendors = await this.dbService.vendor.findMany({
        select: {
          id: true,
          alias: true,
          name: true,
          address: true,
          country: true,
        },
      });
      return allVendors;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch vendors');
    }
  }

  async update(id: number, updateVendor: VendorDTO) {
    try {
      const vendor = await this.dbService.vendor.update({
        where: { id },
        data: updateVendor,
        select: {
          id: true,
          alias: true,
        },
      });
      return vendor;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Vendor with ID ${id} not found`);
      }
      throw error;
    }
  }
  async remove(id: number) {
    try {
      const vendor = await this.dbService.vendor.delete({
        where: { id },
        select: { id: true, alias: true },
      });
      return vendor;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Vendor with ID ${id} not found`);
      }
      throw error;
    }
  }
}
