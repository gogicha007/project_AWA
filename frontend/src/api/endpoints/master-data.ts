import { AxiosError } from 'axios';
import apiClient from '../api-client';
import {
  MaterialGroupDTO,
  MaterialTypeDTO,
  MaterialNameDTO,
  UnitDTO,
} from '../types';

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
    return response.data;
  },
};

export const unitsApi = {
  getAll: async (): Promise<UnitDTO[]> => {
    const response = await apiClient.get('/units');
    return response.data;
  },

  create: async (unit: UnitDTO): Promise<UnitDTO> => {
    const unitData: UnitDTO = {
      unit: unit.unit,
    };

    const response = await apiClient.post('/units', unitData);
    return response.data;
  },

  update: async (unit: UnitDTO): Promise<UnitDTO> => {
    const unitData: UnitDTO = {
      unit: unit.unit,
    };
    const response = await apiClient.patch(`/units/${unit.id}`, unitData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/units/${id}`);
    return response.data;
  },
};

export const materialTypesApi = {
  getAll: async (): Promise<MaterialTypeDTO[]> => {
    const response = await apiClient.get('/material-types');
    return response.data;
  },

  create: async (materialType: MaterialTypeDTO): Promise<MaterialTypeDTO> => {
    const materialTypeData: MaterialTypeDTO = {
      type: materialType.type,
      groupId: materialType.groupId,
    };

    const response = await apiClient.post('/material-types', materialTypeData);
    return response.data;
  },

  update: async (materialType: MaterialTypeDTO): Promise<MaterialTypeDTO> => {
    const materialTypeData: MaterialTypeDTO = {
      type: materialType.type,
      groupId: materialType.groupId,
    };
    const response = await apiClient.patch(
      `/material-types/${materialType.id}`,
      materialTypeData
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/material-types/${id}`);
    return response.data;
  },
};

export const materialNamesApi = {
  getAll: async (): Promise<MaterialNameDTO[]> => {
    const response = await apiClient.get('/material-names');
    return response.data;
  },

  create: async (materialName: MaterialNameDTO): Promise<MaterialNameDTO> => {
    try {
      const materialNameData: MaterialNameDTO = {
        typeId: materialName.typeId,
        dn: materialName.dn,
        pn: materialName.pn,
        degree: materialName.degree,
        name: materialName.name,
        description: materialName.description,
      };
  
      const response = await apiClient.post('/material-names', materialNameData);
      console.log('master-data response', response)
      return response.data;
    } catch(error) {
       if (error instanceof AxiosError && error.response?.data?.message) {
        throw error.response?.data?.message;
      }
      throw 'Unknown error';
    }
  },

  update: async (materialName: MaterialNameDTO): Promise<MaterialNameDTO> => {
    try {
      const materialNameData: MaterialNameDTO = {
        typeId: materialName.typeId,
        dn: materialName.dn,
        pn: materialName.pn,
        degree: materialName.degree,
        name: materialName.name,
        description: materialName.description,
      };
      const response = await apiClient.patch(
        `/material-names/${materialName.id}`,
        materialNameData
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw error.response?.data?.message;
      }
      throw 'Unknown error';
    }
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/material-names/${id}`);
    return response.data;
  },
};
