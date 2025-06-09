import { CreateInvoiceItemDTO } from './create-invoice-item.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInvoiceItemDTO extends PartialType(CreateInvoiceItemDTO) {}
