import { CreateInvoiceDTO } from './create-invoice.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInvoiceDTO extends PartialType(CreateInvoiceDTO) {}
