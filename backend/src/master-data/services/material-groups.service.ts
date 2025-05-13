import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/dadabase/database.service';

@Injectable()
export class MaterialGroupsService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    const allGroups = await this.dbService.materialGroup.findMany({
      select: {
        name: true,
        description: true,
      },
    });
    return allGroups;
  }
}
