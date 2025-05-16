import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { CreateMaterialGroupDTO } from '../dto/createMaterialGroup.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MaterialGroupsService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: CreateMaterialGroupDTO) {
    const materialGroup = await this.dbService.materialGroup.create({
      data: payload,
      select: {
        name: true,
        description: true,
      },
    });
    return materialGroup;
  }

  async findAll() {
    const allGroups = await this.dbService.materialGroup.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return allGroups;
  }

  async update(id: number, updateMaterialGroup: CreateMaterialGroupDTO) {
    try {
      const materialGroup = await this.dbService.materialGroup.update({
        where: { id },
        data: updateMaterialGroup,
        select: {
          id: true,
          name: true,
        },
      });
      return materialGroup;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Material Group with ID ${id} not found`);
      }
      throw error;
    }
  }
  async remove(id: number) {
    try {
      const materialGroup = await this.dbService.materialGroup.delete({
        where: { id },
        select: { id: true, name: true },
      });
      return materialGroup;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Material Group with ID ${id} not found`);
      }
      throw error;
    }
  }
}
