import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { UnitDTO } from '../dto/units.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UnitsService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: UnitDTO) {
    const materialGroup = await this.dbService.unit.create({
      data: payload,
      select: {
        unit: true,
      },
    });
    return materialGroup;
  }

  async findAll() {
    const allGroups = await this.dbService.unit.findMany({
      select: {
        id: true,
        unit: true,
      },
    });
    return allGroups;
  }

  async update(id: number, updateUnit: UnitDTO) {
    try {
      const unit = await this.dbService.unit.update({
        where: { id },
        data: updateUnit,
        select: {
          id: true,
          unit: true,
        },
      });
      return unit;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Unit with ID ${id} not found`);
      }
      throw error;
    }
  }
  async remove(id: number) {
    try {
      const unit = await this.dbService.unit.delete({
        where: { id },
        select: { id: true, unit: true },
      });
      return unit;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Unit with ID ${id} not found`);
      }
      throw error;
    }
  }
}
