import { PartialType } from '@nestjs/swagger';
import { CreateProjectSectionDto } from './create-projectSection.dto';

export class UpdateProjectSectionDto extends PartialType(
  CreateProjectSectionDto,
) {}
