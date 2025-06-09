import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

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
  @IsInt()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  unitId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  total: number;
}
