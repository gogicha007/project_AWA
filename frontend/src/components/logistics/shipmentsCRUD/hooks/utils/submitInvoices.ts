import { ShipmentFormValues } from '../useShipmentFormSet';
import { originalInvoiceIds } from './shipmentFormUtils';
import { ensureNumber, ensureInteger } from '@/utils/helper';
import { invoiceApi } from '@/api/endpoints/purchases/invoiceApi';
import { invoiceItemApi } from '@/api/endpoints/purchases/invoiceItemApi';
import { formatToISODateTime } from '@/utils/dateFormat';

export const handleSubmitInvoice = async (
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
      await invoiceItemApi.deleteItemsArray(data._hasRemovals.inInvoiceItems);
    }

    // check hasRemovals.inInvoices
    if (
      data._hasRemovals.inInvoices &&
      data._hasRemovals.inInvoices.length > 0
    ) {
      await invoiceApi.deleteInvoiceArray(data._hasRemovals.inInvoices);
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
      console.log('invoices with items', invoicesWithItems, shipmentId)
      await invoiceApi.createInvoicesWithItemsBulk(invoicesWithItems);
    }

    return { success: true, originalInvoiceIds: existingInvoiceIds };
  } catch (error) {
    console.error('Error submitting invoice(s):', error);
    throw error;
  }
};
