import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreateInvoiceItemDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  invoiceId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  unitId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total: number;
}
