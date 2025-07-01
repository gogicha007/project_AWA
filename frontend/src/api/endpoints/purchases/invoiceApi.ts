import { handleApiError } from '@/utils/handleApiError';
import apiClient from '../../api-client';
import { InvoiceDTO } from '../../types';

export const invoiceApi = {
  getAll: async (): Promise<InvoiceDTO[]> => {
    const response = await apiClient.get('/invoices');
    return response.data;
  },

  getById: async (id: number): Promise<InvoiceDTO> => {
    const response = await apiClient.get(`/invoices/${id}`);
    return response.data;
  },

  create: async (invoice: InvoiceDTO, userId: number): Promise<InvoiceDTO> => {
    try {
      const invoiceCreateData = {
        vendorId: invoice.vendorId,
        invoiceNubmer: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
        totalAmount: invoice.totalAmount,
        userId: userId,
        currencyId: invoice.currencyId,
        shipmentId: invoice.shipmentId,
      };
      const invoiceCreateResponse = await apiClient.post(
        '/invoices',
        invoiceCreateData
      );

      return invoiceCreateResponse.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (invoice: InvoiceDTO, userId: number): Promise<InvoiceDTO> => {
    try {
      const invoiceUpdateData = {
        vendorId: invoice.vendorId,
        invoiceNubmer: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
        totalAmount: invoice.totalAmount,
        userId: userId,
        currencyId: invoice.currencyId,
        shipmentId: invoice.shipmentId,
      };

      const response = await apiClient.patch(
        `/invoices/${invoice.id}`,
        invoiceUpdateData
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteAllByShipmentId: async (shipmentId: number): Promise<void> => {
    try {
      const response = await apiClient.delete(
        `/invoices/shipment/${shipmentId}`
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await apiClient.delete(`/invoices/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
