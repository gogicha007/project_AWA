import { InvoiceDTO, ShipmentDTO } from '@/api/types';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { ensureNumber, ensureInteger } from '@/utils/helper';
import { ShipmentFormSchema } from '../../shipmentSchema';

export const createDefaultValues = (): ShipmentFormSchema => ({
  alias: '',
  status: '' as ShipmentFormSchema['status'],
  declaration_number: '',
  declaration_date: undefined,
  Files: [],
  Invoices: [],
  InvoiceItems: [],
  _hasRemovals: {
    inFiles: false,
    inInvoices: [],
    inInvoiceItems: [],
    inFreights: [],
  },
});

export const transformShipmentToFormData = (
  shipment: ShipmentDTO
): ShipmentFormSchema => ({
  alias: shipment.alias,
  status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: shipment.declaration_number || '',
  declaration_date: shipment.declaration_date
    ? typeof shipment.declaration_date === 'string'
      ? new Date(shipment.declaration_date)
      : shipment.declaration_date
    : undefined,
  Files: shipment.Files,
  Invoices: shipment.Invoices,
  InvoiceItems: shipment.Invoices
    ? shipment.Invoices.flatMap((inv: InvoiceDTO) => inv.Items ?? [])
    : [],
  Freights: shipment.Freights,
  _hasRemovals: {
    inFiles: false,
    inInvoices: [],
    inInvoiceItems: [],
    inFreights: [],
  },
});

export const detectFormChanges = (
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormSchema>
) => {
  const generalFields: (keyof ShipmentFormSchema)[] = [
    'alias',
    'declaration_date',
    'declaration_number',
    'status',
  ];

  const hasGeneralFieldChanges = generalFields.some(
    (item) => dirtyFields[item] === true
  );

  const hasFileChanges = () => {
    if (!('files' in dirtyFields)) return false;
    if (Array.isArray(dirtyFields.files) && dirtyFields.files.length > 0) {
      return dirtyFields.files.some((file) =>
        Object.values(file).includes(true)
      );
    }
    if ('files' in dirtyFields) return true;
  };

  const hasInvoiceChanges = () => {
    if (dirtyFields?._hasRemovals?.inInvoices) return true;

    if (!('invoices' in dirtyFields)) return false;
    // in case invoice property of dirtyFields is an array
    if (
      Array.isArray(dirtyFields.invoices) &&
      dirtyFields.invoices.length > 0
    ) {
      return dirtyFields.invoices.some((invoice) =>
        Object.values(invoice).includes(true)
      );
    }
    if ('invoices' in dirtyFields) return true;
  };

  const hasInvoiceItemChanges = () => {
    // if there are removals in items
    if (dirtyFields?._hasRemovals?.inInvoiceItems) return true;

    if (!('invoiceItems' in dirtyFields)) return false;

    // in case invoiceItems property is an array
    if (
      Array.isArray(dirtyFields.invoiceItems) &&
      dirtyFields.invoiceItems.length > 0
    ) {
      return dirtyFields.invoiceItems.some((item) =>
        Object.values(item).includes(true)
      );
    }
    // invoiceItems property is a boolean
    if ('invoiceItems' in dirtyFields) return true;
  };

  const hasFreightChanges = () => {
    if (dirtyFields?._hasRemovals?.inFreights) return true;

    if (!('freights' in dirtyFields)) return false;
    if (
      Array.isArray(dirtyFields.freights) &&
      dirtyFields.freights.length > 0
    ) {
      return dirtyFields.freights.some((item) =>
        Object.values(item).includes(true)
      );
    }
    if ('freights' in dirtyFields) return true;
  };

  return {
    hasGeneralFieldChanges,
    hasFileChanges,
    hasFreightChanges,
    hasInvoiceChanges,
    hasInvoiceItemChanges,
  };
};

export const originalInvoiceIds = (data: ShipmentFormSchema) => {
  const idsArray = data.Invoices
    ?.filter((invoice: InvoiceDTO) => Number(invoice.id) > 0)
    .map((invoice: InvoiceDTO) => invoice.id);

  return idsArray ?? [];
};

// Transform form data to ensure all numeric fields are properly typed
export const transformFormDataForSubmission = (
  data: ShipmentFormSchema
): ShipmentFormSchema => {
  return {
    ...data,
    Invoices: data.Invoices?.map((invoice) => ({
      ...invoice,
      vendorId: ensureInteger(invoice.vendorId),
      currencyId: ensureInteger(invoice.currencyId),
      totalAmount: ensureNumber(invoice.totalAmount),
    })),
    InvoiceItems: data.InvoiceItems?.map((item) => ({
      ...item,
      productId: ensureInteger(item.productId),
      quantity: ensureNumber(item.quantity),
      unitId: ensureInteger(item.unitId),
      unitPrice: ensureNumber(item.unitPrice),
      total: ensureNumber(item.total),
    })),
  };
};
