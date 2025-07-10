import { ShipmentFormValues } from '../useShipmentFormSet';
import { InvoiceDTO, ShipmentDTO } from '@/api/types';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { invoiceItemApi } from '@/api/endpoints/purchases/invoiceItemApi';
import { invoiceApi } from '@/api/endpoints/purchases/invoiceApi';
import { formatToISODateTime } from '@/utils/dateFormat';

const ensureNumber = (value: string | number | undefined | null): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const ensureInteger = (value: string | number | undefined | null): number => {
  if (typeof value === 'number') return Math.floor(value);
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const createDefaultValues = (): ShipmentFormValues => ({
  alias: '',
  status: '' as '' | 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: '',
  declaration_date: undefined,
  files: [],
  invoices: [],
  invoiceItems: [],
  _hasRemovals: { inFiles: false, inInvoices: [], inInvoiceItems: [] },
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
  _hasRemovals: { inFiles: false, inInvoices: [], inInvoiceItems: [] },
});

export const detectFormChanges = (
  data: ShipmentFormValues,
  originalValues: Partial<ShipmentFormValues>,
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
    if (!('invoiceItems' in dirtyFields)) return false;

    // invoiceItems property is an array
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
    // if there are removals in items
    if ('_hasRemovals.inInvoiceITems' in dirtyFields) return true;
  };

  return {
    hasGeneralFieldChanges,
    hasFileChanges,
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

export const handleInvoiceChange = async (
  data: ShipmentFormValues,
  shipmentId: number,
  dbUserId: number
) => {
  const existingInvoiceIds = originalInvoiceIds(data);

  try {
    // check hasRemovals.inInvoiceItems
    if (
      data._hasRemovals.inInvoiceItems &&
      data._hasRemovals.inInvoiceItems.length > 0
    ) {
      console.log('hasRemovals inInvoiceItems');
      await invoiceItemApi.deleteItemsArray(data._hasRemovals.inInvoiceItems);
    }

    // check hasRemovals.inInvoices
    if (
      data._hasRemovals.inInvoices &&
      data._hasRemovals.inInvoices.length > 0
    ) {
      console.log('hasRemovals inInvoices');
      await invoiceItemApi.deleteAllByInvoiceIdsArray(
        data._hasRemovals.inInvoices
      );
      console.log('there are removed invoices');
    }

    if (data.invoices && data.invoices.length > 0) {
      const invoicesWithItems = data.invoices.map((invoice) => ({
        id: invoice.id,
        vendorId: ensureInteger(invoice.vendorId),
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: formatToISODateTime(invoice.invoiceDate) as Date,
        totalAmount: ensureNumber(invoice.totalAmount),
        currencyId: ensureInteger(invoice.currencyId),
        userId: dbUserId,
        shipmentId: shipmentId,
        items: (
          data.invoiceItems?.filter((item) => item.invoiceId === invoice.id) ||
          []
        ).map((item) => ({
          ...item,
          id: item.id,
          productId: ensureInteger(item.productId),
          quantity: ensureNumber(item.quantity),
          unitId: ensureInteger(item.unitId),
          unitPrice: ensureNumber(item.unitPrice),
          total: ensureNumber(item.total),
        })),
      }));
      await invoiceApi.createInvoicesWithItemsBulk(invoicesWithItems);
    }

    console.log('Invoice changes processed successfully');
    return { success: true, originalInvoiceIds: existingInvoiceIds };
  } catch (error) {
    console.error('Error handling invoice changes:', error);
    throw error;
  }
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
