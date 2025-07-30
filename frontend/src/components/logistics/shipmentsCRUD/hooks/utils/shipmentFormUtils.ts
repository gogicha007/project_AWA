import { InvoiceDTO } from '@/api/types';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { ensureNumber, ensureInteger, ensureDate } from '@/utils/helper';
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
  shipment: ShipmentFormSchema
): ShipmentFormSchema => ({
  alias: shipment.alias,
  status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: shipment.declaration_number || '',
  declaration_date: ensureDate(shipment.declaration_date),
  Files: shipment.Files,
  Invoices: shipment.Invoices?.map((inv: InvoiceDTO) => ({
    ...inv,
    invoiceDate: ensureDate(inv.invoiceDate),
    totalAmount: inv.totalAmount ? +inv.totalAmount : 0,
    Items: [],
  })),
  InvoiceItems: shipment.Invoices
    ? shipment.Invoices.flatMap(
        (inv: InvoiceDTO) =>
          inv.Items?.map((item) => ({
            ...item,
            quantity: ensureNumber(item.quantity),
            unitPrice: ensureNumber(item.unitPrice),
            total: ensureNumber(item.total),
          })) ?? []
      )
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
    if (dirtyFields?._hasRemovals?.inInvoices?.length) return true;

    if (!('Invoices' in dirtyFields)) return false;
    // in case invoice property of dirtyFields is an array
    if (Array.isArray(dirtyFields.Invoices) && dirtyFields.Invoices.length > 0)
      return dirtyFields.Invoices.some((invoice) =>
        Object.values(invoice).includes(true)
      );

    // if ('Invoices' in dirtyFields) return true;
  };

  const hasInvoiceItemChanges = () => {
    // if there are removals in items
    if (dirtyFields?._hasRemovals?.inInvoiceItems?.length) return true;

    if (!('InvoiceItems' in dirtyFields)) return false;

    // in case invoiceItems property is an array
    if (
      Array.isArray(dirtyFields.InvoiceItems) &&
      dirtyFields.InvoiceItems.length > 0
    )
      return dirtyFields.InvoiceItems.some((item) =>
        Object.values(item).includes(true)
      );

    // invoiceItems property is a boolean
    // if ('InvoiceItems' in dirtyFields) return true;
  };

  const hasFreightChanges = () => {
    if (dirtyFields?._hasRemovals?.inFreights?.length) return true;

    if (!('Freights' in dirtyFields)) return false;
    if (
      Array.isArray(dirtyFields.Freights) &&
      dirtyFields.Freights.length > 0
    ) {
      return dirtyFields.Freights.some((item) =>
        Object.values(item).includes(true)
      );
    }
    // if ('Freights' in dirtyFields) return true;
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
  const idsArray = data.Invoices?.filter(
    (invoice: InvoiceDTO) => Number(invoice.id) > 0
  ).map((invoice: InvoiceDTO) => invoice.id);

  return idsArray ?? [];
};

// Transform form data to ensure all numeric fields are properly typed
export const transformFormDataForSubmission = (
  data: ShipmentFormSchema
): ShipmentFormSchema => {
  return {
    ...data,
    declaration_date: data.declaration_date,
    Invoices: data.Invoices?.map((invoice) => ({
      ...invoice,
      vendorId: ensureInteger(invoice.vendorId),
      currencyId: ensureInteger(invoice.currencyId),
      totalAmount: ensureNumber(invoice.totalAmount),
      invoiceDate: invoice.invoiceDate,
    })),
    InvoiceItems: data.InvoiceItems?.map((item) => ({
      ...item,
      productId: ensureInteger(item.productId),
      quantity: ensureNumber(item.quantity),
      unitId: ensureInteger(item.unitId),
      unitPrice: ensureNumber(item.unitPrice),
      total: ensureNumber(item.total),
    })),
    Freights: data.Freights?.map((freight) => ({
      ...freight,
      currencyId: ensureInteger(freight.currencyId),
      freightRate: ensureNumber(freight.freightRate),
      billDate: freight.billDate,
    })),
  };
};
