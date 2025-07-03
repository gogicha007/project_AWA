import { ShipmentFormValues } from '../useShipmentFormSet';
import { InvoiceDTO, ShipmentDTO } from '@/api/types';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { invoiceItemApi } from '@/api/endpoints/purchases/invoiceItemApi';
import { invoiceApi } from '@/api/endpoints/purchases/invoiceApi';

export const createDefaultValues = (): ShipmentFormValues => ({
  alias: '',
  status: '' as '' | 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: '',
  declaration_date: undefined,
  files: [],
  invoices: [],
  invoiceItems: [],
  _hasRemovals: false,
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
  _hasRemovals: false,
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
    if (
      Array.isArray(dirtyFields.invoiceItems) &&
      dirtyFields.invoiceItems.length > 0
    ) {
      return dirtyFields.invoiceItems.some((item) =>
        Object.values(item).includes(true)
      );
    }
    if ('invoiceItems' in dirtyFields) return true;
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
    // remove all invoice items with existing invoice ids
    if (existingInvoiceIds.length > 0) {
      await invoiceItemApi.deleteAllByInvoiceIdsArray(
        existingInvoiceIds as number[]
      );
    }

    // remove all invoices with shipmentId
    if (existingInvoiceIds.length > 0) {
      await invoiceApi.deleteAllByShipmentId(shipmentId);
    }

    // // recreate all invoices & invoice items with shipmentId
    if (data.invoices && data.invoices.length > 0) {
      const invoicesWithItems = data.invoices.map((invoice) => ({
        vendorId: invoice.vendorId,
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
        totalAmount: invoice.totalAmount || 0,
        currencyId: invoice.currencyId,
        userId: dbUserId,
        shipmentId: shipmentId,
        items:
          data.invoiceItems?.filter((item) => item.invoiceId === invoice.id) ||
          [],
      }));
      console.log(invoicesWithItems)
      await invoiceApi.createInvoicesWithItemsBulk(invoicesWithItems);
    }

    console.log('Invoice changes processed successfully');
    return { success: true, originalInvoiceIds: existingInvoiceIds };
  } catch (error) {
    console.error('Error handling invoice changes:', error);
    throw error;
  }
};
