import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInvoiceDTO } from './create-invoice.dto';
import { CreateInvoiceItemDTO } from '../invoice-items/dto/create-invoice-item.dto';

// Create a modified invoice item DTO without invoiceId (since it will be auto-assigned)
class CreateInvoiceItemForBulkDTO extends OmitType(CreateInvoiceItemDTO, [
  'invoiceId',
]) {}

// Create a modified invoice DTO without shipmentId and userId (will be passed separately)
class CreateInvoiceForBulkDTO extends CreateInvoiceDTO {
  @ApiProperty({ type: [CreateInvoiceItemForBulkDTO], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemForBulkDTO)
  @IsOptional()
  items?: CreateInvoiceItemForBulkDTO[];
}

export class CreateInvoicesWithItemsDTO {
  @ApiProperty({ type: [CreateInvoiceForBulkDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceForBulkDTO)
  invoices: CreateInvoiceForBulkDTO[];
}
