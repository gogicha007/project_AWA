import apiClient from '@/api/api-client';
import { LocationDTO } from '@/api/types';
import { handleApiError } from '@/utils/handleApiError';

export const locationsApi = {
    getAll: async (): Promise<LocationDTO[]> => {
        try {
            const response = await apiClient.get('/locations');
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
};