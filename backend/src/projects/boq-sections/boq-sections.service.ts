import { Injectable } from '@nestjs/common';
import { CreateBoqSectionDto } from './dto/create-boq-section.dto';
import { UpdateBoqSectionDto } from './dto/update-boq-section.dto';

@Injectable()
export class BoqSectionsService {
  create(createBoqSectionDto: CreateBoqSectionDto) {
    console.log(createBoqSectionDto);
    return 'This action adds a new boqSection';
  }

  findAll() {
    return `This action returns all boqSections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boqSection`;
  }

  update(id: number, updateBoqSectionDto: UpdateBoqSectionDto) {
    console.log(updateBoqSectionDto);
    return `This action updates a #${id} boqSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} boqSection`;
  }
}
