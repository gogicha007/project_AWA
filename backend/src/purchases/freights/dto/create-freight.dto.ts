import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateFreightDTO {
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
  shipmentId: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isArrived: boolean;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
