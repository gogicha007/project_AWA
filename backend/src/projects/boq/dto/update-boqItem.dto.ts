import { PartialType } from '@nestjs/swagger';
import { CreateBoqItemDto } from './create-boqItem.dto';

export class UpdateBoqItemDto extends PartialType(CreateBoqItemDto) {}
