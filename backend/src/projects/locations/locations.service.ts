import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { DatabaseService } from 'src/database/database/database.service';

@Injectable()
export class LocationsService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(createLocationDto: CreateLocationDto) {
    const location = await this.dbService.location.create({
      data: createLocationDto,
    });
    return location;
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.dbService.location.update({
      where: { id },
      data: updateLocationDto,
    });
    return location;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
