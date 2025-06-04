import { handleApiError } from '@/utils/handleApiError';
import apiClient from '../api-client';
import { ShipmentDTO } from '../types';

export const shipmentsApi = {
  getAll: async (): Promise<ShipmentDTO[]> => {
    const response = await apiClient.get('/shipments');
    return response.data;
  },

  create: async (shipment: ShipmentDTO): Promise<ShipmentDTO> => {
    try {
      const shipmentData: ShipmentDTO = {
        alias: shipment.alias,
      };
      return shipmentData;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (shipment: ShipmentDTO): Promise<ShipmentDTO> => {
    try {
      const shipmentData: ShipmentDTO = {
        alias: shipment.alias,
      };
      return shipmentData;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id: number) => {
    try {
      const response = await apiClient.delete(`/shipments/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
