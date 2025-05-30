import apiClient from '../api-client';
import { User as FirebaseUser } from 'firebase/auth';
import { UserCreateDTO, UserResponseDTO } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const usersApi = {
  getAll: async (): Promise<UserResponseDTO[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getById: async (id: string): Promise<UserResponseDTO> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  getByFBUid: async (uid: string): Promise<UserResponseDTO> => {
    try {
      const response = await apiClient.get(`/users/fb/${uid}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  create: async (firebaseUser: FirebaseUser): Promise<UserResponseDTO> => {
    const userData: UserCreateDTO = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    };

    const response = await apiClient.post('/users', userData);
    return response.data;
  },
};
