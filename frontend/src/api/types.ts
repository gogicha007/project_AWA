import {
  freightSchema,
  invoiceSchema,
  invoiceItemSchema,
  shipmentFormSchema,
  serverFileDataSchema,
} from '@/components/logistics/shipmentsCRUD/shipmentSchema';
import { z } from 'zod';

export interface UserCreateDTO {
  email: string;
  displayName?: string;
  photoURL?: string;
  uid: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

export interface MaterialGroupDTO {
  id?: number;
  name: string;
  description: string;
}

export interface MaterialTypeDTO {
  id?: number;
  type: string;
  groupId: number;
}

export interface UnitDTO {
  id?: number;
  unit: string;
}

export interface MaterialNameDTO {
  id?: number;
  name: string;
  dn: string;
  pn: string;
  degree?: number;
  typeId: number;
  description?: string;
}

export interface VendorDTO {
  id?: number;
  alias: string;
  name?: string;
  address?: string;
  country: string;
}

export interface CurrencyDTO {
  id?: number;
  code: string;
  name: string;
}

export type ShipmentDTO = z.infer<typeof shipmentFormSchema>;

export type ShipmentFileDTO = z.infer<typeof serverFileDataSchema>

export type InvoiceDTO = z.infer<typeof invoiceSchema>;

export type InvoiceItemDTO = z.infer<typeof invoiceItemSchema>;

export type FreightDTO = z.infer<typeof freightSchema>;


// export interface ShipmentDTO {
//   id?: number;
//   alias: string;
//   declaration_number: string;
//   declaration_date: Date | string | null;
//   status: string;
//   Files?: Array<ShipmentFileDTO>;
//   Invoices?: Array<InvoiceDTO>;
//   Freights?: Array<FreightDTO>;
// }

// export interface ShipmentFileDTO {
//   id?: number;
//   fileName: string;
//   fileType: string;
//   fileData: string;
//   shipmentId?: number;
// }

// export interface InvoiceItemDTO {
//   id?: number;
//   invoiceId: number;
//   productId: number;
//   description: string;
//   quantity: number;
//   unitId: number;
//   unitPrice: number;
//   total?: number;
// }

// export interface FreightDTO {
//   id?: number;
//   truckNumber: string;
//   forwarder?: string;
//   billNumber?: string;
//   billDate?: Date;
//   freightRate?: number;
//   currencyId?: number;
//   shipmentId?: number;
// }

// export interface InvoiceDTO {
//   id?: number;
//   vendorId: number;
//   invoiceNumber: string;
//   invoiceDate: Date;
//   totalAmount?: number;
//   userId?: number;
//   currencyId: number;
//   shipmentId?: number;
//   Items?: Array<InvoiceItemDTO>;
// }
