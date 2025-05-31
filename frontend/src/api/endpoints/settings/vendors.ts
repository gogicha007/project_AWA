import apiClient from '@/api/api-client';
import { VendorDTO } from '@/api/types';
import { handleApiError } from '@/utils/handleApiError';

export const vendorsApi = {
  getAll: async (): Promise<VendorDTO[]> => {
    try {
      const response = await apiClient.get('vendors');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  create: async (vendor: VendorDTO, userId: number): Promise<VendorDTO> => {
    try {
      const vendorCreateData = {
        alias: vendor.alias,
        name: vendor.name,
        address: vendor.address,
        country: vendor.country,
        user_id: userId,
      };
      const response = await apiClient.post('/vendors', vendorCreateData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (vendor: VendorDTO, userId: number): Promise<VendorDTO> => {
    try {
      const vendorUpdateData = {
        alias: vendor.alias,
        name: vendor.name,
        address: vendor.address,
        country: vendor.country,
        user_id: userId,
      };
      const response = await apiClient.patch(
        `/vendors/${vendor.id}`,
        vendorUpdateData
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id: number) => {
    try {
      const response = await apiClient.delete(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
