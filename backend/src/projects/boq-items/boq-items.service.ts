import { Injectable } from '@nestjs/common';
import { CreateBoqItemDto } from './dto/create-boq-item.dto';
import { UpdateBoqItemDto } from './dto/update-boq-item.dto';

@Injectable()
export class BoqItemsService {
  create(createBoqItemDto: CreateBoqItemDto) {
    console.log(createBoqItemDto);
    return 'This action adds a new boqItem';
  }

  findAll() {
    return `This action returns all boqItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boqItem`;
  }

  update(id: number, updateBoqItemDto: UpdateBoqItemDto) {
    console.log(updateBoqItemDto);
    return `This action updates a #${id} boqItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} boqItem`;
  }
}
