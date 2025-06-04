import { CreateShipmentDTO } from './create-shipment.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateShipmentDTO extends PartialType(CreateShipmentDTO) {}
