import apiClient from '@/api/api-client';
import { LocationDTO } from '../schema/locationSchema';
import { handleApiError } from '@/utils/handleApiError';

export const locationsApi = {
    getAll: async (): Promise<LocationDTO[]> => {
        try {
            const response = await apiClient.get('/locations');
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    getById: async (id: number): Promise<LocationDTO> => {
        try {
            const response = await apiClient.get(`/locations/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    create: async (location: LocationDTO, userId: number): Promise<LocationDTO> => {
        try {
            const locationCreateData = {
                ...location,
                userId
            };
            const locationCreateResponse = await apiClient.post('/locations', locationCreateData);
            return locationCreateResponse.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    update: async (location: LocationDTO, userId: number): Promise<LocationDTO> => {
        try {
            const locationUpdateData = {
                ...location,
                userId
            };
            const locationUpdateResponse = await apiClient.put(`/locations/${location.id}`, locationUpdateData);
            return locationUpdateResponse.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    deleteAllByProjectId: async (projectId: number): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await apiClient.delete(`/locations/project/${projectId}`);
            return response.data;
        }
        catch (error) {
            handleApiError(error);
        }
    },
    delete: async (id: number): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await apiClient.delete(`/locations/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
}   