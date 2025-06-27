import { handleApiError } from '@/utils/handleApiError';
import apiClient from '../../api-client';
import { InvoiceItemDTO } from '../../types';

export const invoiceItemApi = {
  getAll: async (): Promise<InvoiceItemDTO[]> => {
    const response = await apiClient.get('/invoice-items');
    return response.data;
  },

  getById: async (id: number): Promise<InvoiceItemDTO> => {
    const response = await apiClient.get(`/invoice-items/${id}`);
    return response.data;
  },

  getAllByInvoiceId: async (invoiceId: number) => {
    const response = await apiClient.get(`/invoice-items/invoice/${invoiceId}`);
    return response.data;
  },

  create: async (
    invoiceItem: InvoiceItemDTO,
    invoiceId: number,
    userId: number
  ): Promise<InvoiceItemDTO> => {
    try {
      const invoiceItemCreateData = {
        invoiceId: invoiceId,
        productId: invoiceItem.productId,
        description: invoiceItem.description,
        quantity: invoiceItem.quantity,
        unitId: invoiceItem.unitId,
        unitPrice: invoiceItem.unitPrice,
        total: invoiceItem.quantity * invoiceItem.unitPrice,
        userId: userId,
      };
      const invoiceItemCreateResponse = await apiClient.post(
        '/invoices',
        invoiceItemCreateData
      );

      return invoiceItemCreateResponse.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (
    invoiceItem: InvoiceItemDTO,
    invoiceId: number,
    userId: number
  ): Promise<InvoiceItemDTO> => {
    try {
      const invoiceUpdateData = {
        invoiceId: invoiceId,
        productId: invoiceItem.productId,
        description: invoiceItem.description,
        quantity: invoiceItem.quantity,
        unitId: invoiceItem.unitId,
        unitPrice: invoiceItem.unitPrice,
        total: invoiceItem.quantity * invoiceItem.unitPrice,
        userId: userId,
      };

      const response = await apiClient.patch(
        `/invoices/${invoiceItem.id}`,
        invoiceUpdateData
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delteAllByInvoiceId: async (invoiceId: number) => {
    try {
      const response = await apiClient.delete(
        `/invoice-items/invoice/${invoiceId}`
      );
      return response.data
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id: number) => {
    try {
      const response = await apiClient.delete(`/invoice-items/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
