import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { MaterialTypeDTO } from '../dto/materialTypes.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MaterialTypesService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: MaterialTypeDTO) {
    const materialType = await this.dbService.materialType.create({
      data: payload,
      select: {
        type: true,
      },
    });
    return materialType;
  }

  async findAll() {
    const allTypes = await this.dbService.materialType.findMany({
      select: {
        id: true,
        type: true,
        groupId: true,
      },
    });
    return allTypes;
  }

  async update(id: number, updateMaterialType: MaterialTypeDTO) {
    try {
      const materialType = await this.dbService.materialType.update({
        where: { id },
        data: updateMaterialType,
        select: {
          id: true,
          type: true,
        },
      });
      return materialType;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Material Type with ID ${id} not found`);
      }
      throw error;
    }
  }
  async remove(id: number) {
    try {
      const materialType = await this.dbService.materialType.delete({
        where: { id },
        select: { id: true, type: true },
      });
      return materialType;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Material Type with ID ${id} not found`);
      }
      throw error;
    }
  }
}
