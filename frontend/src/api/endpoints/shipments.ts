import { handleApiError } from '@/utils/handleApiError';
import apiClient from '../api-client';
import { ShipmentDTO } from '../types';

export const shipmentsApi = {
  getAll: async (): Promise<ShipmentDTO[]> => {
    const response = await apiClient.get('/shipments');
    return response.data;
  },

  create: async (
    shipment: ShipmentDTO,
    userId: number
  ): Promise<ShipmentDTO> => {
    try {
      const shipmentCreateData = {
        alias: shipment.alias,
        declaration_number: shipment.declaration_number,
        declaration_date: shipment.declaration_date,
        status: shipment.status,
        userId: userId,
      };
      console.log('shipment create data', shipmentCreateData);
      const response = await apiClient.post('/shipments', shipmentCreateData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (
    shipment: ShipmentDTO,
    userId: number
  ): Promise<ShipmentDTO> => {
    try {
      const shipmentUpdateData = {
        alias: shipment.alias,
        declaration_number: shipment.declaration_number,
        declaration_date: shipment.declaration_date,
        status: shipment.status,
        userId: userId,
      };
      console.log('shipment update data', shipmentUpdateData);
      const response = await apiClient.patch(
        `/shipments/${shipment.id}`,
        shipmentUpdateData
      );
      return response.data;
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
