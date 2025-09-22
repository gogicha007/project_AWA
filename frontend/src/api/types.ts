import {
  freightSchema,
  invoiceSchema,
  invoiceItemSchema,
  serverFileDataSchema,
  generalInfoSchema
} from '@/components/logistics/shipmentsCRUD/shipmentSchema';
import projectFormSchema from '@/components/projects/projectsCRUD/projectSchema';
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


export type GeneralInfoDTO = z.infer<typeof generalInfoSchema> & {
  Invoices?: InvoiceDTO[];
};

export type ShipmentFileDTO = z.infer<typeof serverFileDataSchema>;

export type InvoiceDTO = z.infer<typeof invoiceSchema>;

export type InvoiceItemDTO = z.infer<typeof invoiceItemSchema>;

export type FreightDTO = z.infer<typeof freightSchema>;

export type ProjectStatus = 'active' | 'completed' | 'inProgress' | 'onHold';

export type ProjectDTO = z.infer<typeof projectFormSchema>;