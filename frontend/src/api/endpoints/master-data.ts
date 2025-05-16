import apiClient from '../api-client';
import { MaterialGroupDTO } from '../types';

export const materialGroupsApi = {
  getAll: async (): Promise<MaterialGroupDTO[]> => {
    const response = await apiClient.get('/material-groups');
    return response.data;
  },

  create: async (
    materialGroup: MaterialGroupDTO
  ): Promise<MaterialGroupDTO> => {
    const materialGroupData: MaterialGroupDTO = {
      name: materialGroup.name,
      description: materialGroup.description,
    };

    const response = await apiClient.post(
      '/material-groups',
      materialGroupData
    );
    return response.data;
  },

  update: async (
    materialGroup: MaterialGroupDTO
  ): Promise<MaterialGroupDTO> => {
    const materialGroupData: MaterialGroupDTO = {
      name: materialGroup.name,
      description: materialGroup.description,
    };
    const response = await apiClient.patch(
      `/material-groups/${materialGroup.id}`,
      materialGroupData
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/material-groups/${id}`);
    return response.data
  },
};
