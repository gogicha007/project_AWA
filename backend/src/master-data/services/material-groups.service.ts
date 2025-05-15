import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';
import { CreateMaterualGroupDTO } from '../dto/createMaterialGroup.dto';

@Injectable()
export class MaterialGroupsService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(payload: CreateMaterualGroupDTO) {
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
}
