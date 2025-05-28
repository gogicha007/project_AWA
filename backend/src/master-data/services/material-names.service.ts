import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { MaterialNameDTO } from '../dto/materialNames.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MaterialNamesService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: MaterialNameDTO) {
    const materialName = await this.dbService.materialName.create({
      data: { ...payload, degree: payload.degree ?? 0 },
      select: {
        name: true,
      },
    });
    return materialName;
  }

  async findAll() {
    const allMaterialNames = await this.dbService.materialName.findMany({
      select: {
        id: true,
        name: true,
        dn: true,
        pn: true,
        degree: true,
        typeId: true,
        description: true
      },
    });
    return allMaterialNames;
  }

  async update(id: number, updateMaterialName: MaterialNameDTO) {
    try {
      const materialName = await this.dbService.materialName.update({
        where: { id },
        data: updateMaterialName,
        select: {
          id: true,
          name: true,
          typeId: true,
        },
      });
      return materialName;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Material Name with ID ${id} not found`);
      }
      throw error;
    }
  }
  async remove(id: number) {
    try {
      const materialName = await this.dbService.materialName.delete({
        where: { id },
        select: { id: true, name: true },
      });
      return materialName;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Material Name with ID ${id} not found`);
      }
      throw error;
    }
  }
}
