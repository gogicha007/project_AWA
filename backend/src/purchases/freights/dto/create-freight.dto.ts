import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFreightDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  truckNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  forwarder: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  billNumber: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  billDate?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  freightRate: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  currencyId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  shipmentId: number;
}

// DTO for bulk freights
export class CreateFreightsBulkDTO {
  @ApiProperty({ type: [CreateFreightDTO] })
  @IsArray()
  @Type(() => CreateFreightDTO)
  freights: CreateFreightDTO[];
}
