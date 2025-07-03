import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO for individual invoice items
class CreateInvoiceItemForBulkDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  invoiceId: number;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  unitId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNumber()
  total: number;
}

// DTO for individual invoices
class CreateInvoiceForBulkDTO {
  @ApiProperty()
  @IsNumber()
  vendorId: number;

  @ApiProperty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty()
  @IsString()
  invoiceDate: string;

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  currencyId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  shipmentId: number;

  @ApiProperty({ type: [CreateInvoiceItemForBulkDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemForBulkDTO)
  @IsOptional()
  items?: CreateInvoiceItemForBulkDTO[];
}

// DTO for bulk invoices with items
export class CreateInvoicesWithItemsDTO {
  @ApiProperty({ type: [CreateInvoiceForBulkDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceForBulkDTO)
  invoices: CreateInvoiceForBulkDTO[];
}
