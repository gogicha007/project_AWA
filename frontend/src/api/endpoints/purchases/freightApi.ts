import { handleApiError } from '@/utils/handleApiError';
import apiClient from '@/api/api-client';
import { FreightDTO } from '@/api/types';

export const freightApi = {
  getAll: async (): Promise<FreightDTO[]> => {
    const response = await apiClient.get('/freights');
    return response.data;
  },

  getById: async (id: number): Promise<FreightDTO> => {
    const response = await apiClient.get(`/freights/${id}`);
    return response.data;
  },

  create: async (freight: FreightDTO, userId: number): Promise<FreightDTO> => {
    try {
      const freightCreateData = {
        truckNumber: freight.truckNumber,
        forwarder: freight.forwarder,
        billNumber: freight.billNumber,
        billDate: freight.billDate,
        freightRate: freight.freightRate,
        currencyId: freight.currencyId,
        shipmentId: freight.shipmentId,
        isArrived: freight.isArrived,
        userId: userId,
      };
      const freightCreateResponse = await apiClient.post(
        '/freights',
        freightCreateData
      );
      return freightCreateResponse.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (freight: FreightDTO, userId: number): Promise<FreightDTO> => {
    try {
      const freightUpdateData = {
        truckNumber: freight.truckNumber,
        forwarder: freight.forwarder,
        billNumber: freight.billNumber,
        billDate: freight.billDate,
        freightRate: freight.freightRate,
        currencyId: freight.currencyId,
        shipmentId: freight.shipmentId,
        isArrived: freight.isArrived,
        userId: userId,
      };
      const freightUpdateResponse = await apiClient.post(
        '/freights',
        freightUpdateData
      );
      return freightUpdateResponse.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id: number) => {
    try {
      const response = await apiClient.delete(`/freights/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
