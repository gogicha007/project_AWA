import { z } from 'zod';

// Client-side file data schema (for handling File objects)
const clientFileDataSchema = z.object({
  file: z.instanceof(File),
  preview: z.string().url(),
  id: z.number().optional(),
  originalName: z.string(),
  size: z.number(),
  type: z.string(),
});

// Server-side file data schema (matches database table fields)
const serverFileDataSchema = z.object({
  id: z.number().optional(),
  fileName: z.string(),
  fileType: z.string(),
  fileData: z.string(),
  shipmentId: z.number().optional(),
});

const fileDataSchema = serverFileDataSchema;

// Invoice item schema
const invoiceItemSchema = z.object({
  id: z.number().optional(),
  invoiceId: z.number().optional(),
  productId: z.number().min(1, 'Material is required'),
  description: z.string().optional(),
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
  totalAmount: z
    .number()
    .min(0, 'Total amount must be non-negative')
    .optional(),
  shipmentId: z.number().optional(),
  Items: z.array(invoiceItemSchema).optional(),
});

// Freight schema
const freightSchema = z.object({
  id: z.number().optional(),
  truckNumber: z.string().min(1, 'Truck number is required'),
  forwarder: z.string().optional(),
  billNumber: z.string().optional(),
  billDate: z.date().nullable(),
  currencyId: z.number().optional(),
  freightRate: z.number().optional(),
  shipmentId: z.number().optional(),
});

// Removals tracking schema
const hasRemovalsSchema = z.object({
  inFiles: z.boolean(),
  inInvoices: z.array(z.number()),
  inInvoiceItems: z.array(z.number()),
  inFreights: z.array(z.number()),
});

// Create the base schema without refinements first
const shipmentFormBaseSchema = z.object({
  id: z.number().optional(),
  alias: z.string(),
  status: z.enum(['', 'APPLIED', 'DECLARED', 'ARRIVED']),
  declaration_number: z.string().optional(),
  declaration_date: z.date().nullable().optional(),
  Files: z.array(fileDataSchema).optional(),
  Invoices: z.array(invoiceSchema).optional(),
  InvoiceItems: z.array(invoiceItemSchema).optional(),
  Freights: z.array(freightSchema).optional(),
  _hasRemovals: hasRemovalsSchema,
});

// General Info Schema from the base schema
const generalInfoSchema = shipmentFormBaseSchema.omit({
  Files: true,
  Invoices: true,
  InvoiceItems: true,
  Freights: true,
  _hasRemovals: true,
});

export const shipmentFormSchema = shipmentFormBaseSchema
  .refine((val) => val.status !== '', {
    message: 'Status is required',
    path: ['status'],
  })
  .refine(
    (data) => {
      // Custom validation: if status is DECLARED, declaration_number should be provided
      if (data.status === 'DECLARED' && !data.declaration_number?.trim()) {
        return false;
      }
      return true;
    },
    {
      message: 'Declaration number is required when status is DECLARED',
      path: ['declaration_number'],
    }
  )
  .refine(
    (data) => {
      if (data.status === 'DECLARED' && !data.declaration_date) {
        return false;
      }
      return true;
    },
    {
      message: 'Declaration date is required when status is DECLARED',
      path: ['declaration_date'],
    }
  );

export type ShipmentFormSchema = z.infer<typeof shipmentFormSchema>;

export {
  generalInfoSchema,
  clientFileDataSchema,
  fileDataSchema,
  freightSchema,
  hasRemovalsSchema,
  invoiceItemSchema,
  invoiceSchema,
  serverFileDataSchema,
  shipmentFormBaseSchema,
};
