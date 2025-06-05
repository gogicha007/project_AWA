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

export interface ShipmentDTO {
  id?: number;
  alias: string;
  declaration_number: string;
  declaration_date: Date;
  status: string;
  files?: Array<{
    fileName: string;
    fileType: string;
    fileData: string;
  }>;
}

export interface InvoiceDTO {
  id?: number;
  invoiceNumber: string
}
