import { CreateFreightDTO } from './create-freight.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFreightDTO extends PartialType(CreateFreightDTO) {}
