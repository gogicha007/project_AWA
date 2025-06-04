import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
} from 'class-validator';

export enum ShipmentStatus {
  APPLIED = 'APPLIED',
  DECLARED = 'DECLARED',
  ARRIVED = 'ARRIVED',
}

export class CreateShipmentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({ enum: ShipmentStatus })
  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  declaration_number?: string;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsDateString()
  @IsOptional()
  declaration_date?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @IsOptional()
  invoiceIds?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @IsOptional()
  fileIds?: number[];
}
