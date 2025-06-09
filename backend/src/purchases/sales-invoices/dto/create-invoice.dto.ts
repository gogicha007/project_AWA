import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateInvoiceDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  vendorId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  invoiceDate: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  totalAmount: number;

  @ApiProperty()
  @IsBoolean()
  isArrived: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  truckNumber: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  currencyId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
