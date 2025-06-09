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
  declaration_date: Date | string | null;
  status: string;
  files?: Array<ShipmentFileDTO>;
}

export interface ShipmentFileDTO {
  id?: number;
  fileName: string;
  fileType: string;
  fileData: string;
  shipmentId?: number;
}

export interface InvoiceDTO {
  id?: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  totalAmount?: number;
  isArrived?: boolean;
  userId?: number;
  currencyId: number;
}

export interface InvoiceItemDTO {
  id?: number;
  invoiceId: number;
  productId: number;
  description: string;
  quantity: number;
  unitId: number;
  unitPrice: number;
  total: number;
  isArrived?: boolean;
}
