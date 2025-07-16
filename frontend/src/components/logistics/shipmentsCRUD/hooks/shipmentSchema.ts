import { z } from 'zod';

// File data schema
const fileDataSchema = z.object({
  file: z.instanceof(File),
  preview: z.string().url(),
  id: z.number().optional(),
  originalName: z.string(),
  size: z.number(),
  type: z.string(),
});

// Invoice item schema
const invoiceItemSchema = z.object({
  id: z.number().optional(),
  invoiceId: z.number().optional(),
  productId: z.number().min(1, 'Material is required'),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
  unitId: z.number().min(1, 'Unit is required'),
  unitPrice: z.number().min(0, 'Unit price must be non-negative'),
  total: z.number().min(0, 'Total must be non-negative'),
});

// Invoice schema
const invoiceSchema = z.object({
  id: z.number().optional(),
  vendorId: z.number().min(1, 'Vendor is required'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.date().nullable(),
  currencyId: z.number().min(1, 'Currency is required'),
  totalAmount: z.number().min(0, 'Total amount must be non-negative').optional(),
  shipmentId: z.number().optional(),
});

// Freight schema
const freightSchema = z.object({
  id: z.number().optional(),
  truckNumber: z.string().min(1, 'Truck number is required'),
  forwarder: z.string().min(1, 'Forwarder is required'),
  billNumber: z.string().min(1, 'Bill number is required'),
  billDate: z.date().nullable(),
  currencyId: z.number().min(1, 'Currency is required'),
  freightRate: z.number().min(0, 'Freight rate must be non-negative'),
  shipmentId: z.number().optional(),
});

// Removals tracking schema
const hasRemovalsSchema = z.object({
  inFiles: z.boolean(),
  inInvoices: z.array(z.number()),
  inInvoiceItems: z.array(z.number()),
  inFreights: z.array(z.number()),
});

// Main shipment form schema
export const shipmentFormSchema = z.object({
  alias: z.string().min(1, 'Alias is required'),
  status: z.enum(['', 'APPLIED', 'DECLARED', 'ARRIVED'], {
    errorMap: () => ({ message: 'Status is required' }),
  }).refine(val => val !== '', { message: 'Status is required' }),
  declaration_number: z.string().optional(),
  declaration_date: z.date().optional(),
  files: z.array(fileDataSchema).optional(),
  invoices: z.array(invoiceSchema).optional(),
  invoiceItems: z.array(invoiceItemSchema).optional(),
  freights: z.array(freightSchema).optional(),
  _hasRemovals: hasRemovalsSchema,
})
.refine((data) => {
  // Custom validation: if status is DECLARED, declaration_number should be provided
  if (data.status === 'DECLARED' && !data.declaration_number?.trim()) {
    return false;
  }
  return true;
}, {
  message: 'Declaration number is required when status is DECLARED',
  path: ['declaration_number'],
})
.refine((data) => {
  // Custom validation: if status is DECLARED, declaration_date should be provided
  if (data.status === 'DECLARED' && !data.declaration_date) {
    return false;
  }
  return true;
}, {
  message: 'Declaration date is required when status is DECLARED',
  path: ['declaration_date'],
});

// Export the type inferred from the schema for consistency
export type ShipmentFormSchema = z.infer<typeof shipmentFormSchema>;

// Individual schemas for reuse
export {
  fileDataSchema,
  invoiceItemSchema,
  invoiceSchema,
  freightSchema,
  hasRemovalsSchema,
};