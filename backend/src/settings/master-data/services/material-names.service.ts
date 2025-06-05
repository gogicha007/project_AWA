import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { MaterialNameDTO } from '../dto/materialNames.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MaterialNamesService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: MaterialNameDTO) {
    try {
      const materialName = await this.dbService.materialName.create({
        data: payload,
        // data: { ...payload, degree: payload.degree ?? 0 },
        select: {
          name: true,
        },
      });
      return materialName;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new NotFoundException('Material name already exists');
      }
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2009'
      ) {
        throw new BadRequestException('Invalid input data');
      }

      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(`Database error: ${error.message}`);
      }

      throw new BadRequestException('Invalid input data');
    }
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
        description: true,
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
