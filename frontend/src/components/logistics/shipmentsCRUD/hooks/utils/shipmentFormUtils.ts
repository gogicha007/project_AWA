import { ShipmentFormValues } from '../useShipmentFormSet';
import { InvoiceDTO, ShipmentDTO } from '@/api/types';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { ensureNumber, ensureInteger } from '@/utils/helper';

export const createDefaultValues = (): ShipmentFormValues => ({
  alias: '',
  status: '' as '' | 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: '',
  declaration_date: undefined,
  files: [],
  invoices: [],
  invoiceItems: [],
  _hasRemovals: {
    inFiles: false,
    inInvoices: [],
    inInvoiceItems: [],
    inFreights: [],
  },
});

export const transformShipmentToFormData = (
  shipment: ShipmentDTO
): ShipmentFormValues => ({
  alias: shipment.alias,
  status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: shipment.declaration_number || '',
  declaration_date: shipment.declaration_date
    ? typeof shipment.declaration_date === 'string'
      ? new Date(shipment.declaration_date)
      : shipment.declaration_date
    : undefined,
  files: shipment.Files,
  invoices: shipment.Invoices,
  invoiceItems: shipment.Invoices
    ? shipment.Invoices.flatMap((inv) => inv.Items ?? [])
    : [],
  _hasRemovals: {
    inFiles: false,
    inInvoices: [],
    inInvoiceItems: [],
    inFreights: [],
  },
});

export const detectFormChanges = (
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormValues>
) => {
  const generalFields: (keyof ShipmentFormValues)[] = [
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

export const originalInvoiceIds = (data: ShipmentFormValues) => {
  const idsArray = data.invoices
    ?.filter((invoice: InvoiceDTO) => Number(invoice.id) > 0)
    .map((invoice: InvoiceDTO) => invoice.id);

  return idsArray ?? [];
};

// Transform form data to ensure all numeric fields are properly typed
export const transformFormDataForSubmission = (
  data: ShipmentFormValues
): ShipmentFormValues => {
  return {
    ...data,
    invoices: data.invoices?.map((invoice) => ({
      ...invoice,
      vendorId: ensureInteger(invoice.vendorId),
      currencyId: ensureInteger(invoice.currencyId),
      totalAmount: ensureNumber(invoice.totalAmount),
    })),
    invoiceItems: data.invoiceItems?.map((item) => ({
      ...item,
      productId: ensureInteger(item.productId),
      quantity: ensureNumber(item.quantity),
      unitId: ensureInteger(item.unitId),
      unitPrice: ensureNumber(item.unitPrice),
      total: ensureNumber(item.total),
    })),
  };
};
