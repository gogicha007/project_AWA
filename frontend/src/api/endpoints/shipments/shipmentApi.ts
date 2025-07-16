import { handleApiError } from '@/utils/handleApiError';
import apiClient from '../../api-client';
import { ShipmentDTO, GeneralInfoDTO } from '../../types';

export const shipmentApi = {
  getAll: async (): Promise<ShipmentDTO[]> => {
    const response = await apiClient.get('/shipments');
    return response.data;
  },

  getById: async (id: number): Promise<ShipmentDTO> => {
    const response = await apiClient.get(`/shipments/${id}`);
    return response.data;
  },

  create: async (
    shipment: GeneralInfoDTO,
    userId: number
  ): Promise<GeneralInfoDTO> => {
    try {
      const shipmentCreateData = {
        alias: shipment.alias,
        declaration_number: shipment.declaration_number,
        declaration_date: shipment.declaration_date,
        status: shipment.status,
        userId: userId,
      };
      const shipmentResponse = await apiClient.post(
        '/shipments',
        shipmentCreateData
      );

      return shipmentResponse.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (
    shipment: GeneralInfoDTO,
    userId: number
  ): Promise<GeneralInfoDTO> => {
    try {
      const shipmentUpdateData = {
        alias: shipment.alias,
        declaration_number: shipment.declaration_number,
        declaration_date: shipment.declaration_date,
        status: shipment.status,
        userId: userId,
      };
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
