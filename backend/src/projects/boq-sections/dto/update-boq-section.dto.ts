import { PartialType } from '@nestjs/swagger';
import { CreateBoqSectionDto } from './create-boq-section.dto';

export class UpdateBoqSectionDto extends PartialType(CreateBoqSectionDto) {}
