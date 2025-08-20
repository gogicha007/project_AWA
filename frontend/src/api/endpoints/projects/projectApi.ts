import { handleApiError } from "@/utils/handleApiError";
import apiClient from "@/api/api-client";
import { ProjectDTO } from "@/api/types";

export const projectApi = {
  getAll: async (): Promise<ProjectDTO[]> => {
    try {
      const response = await apiClient.get("/projects");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getById: async (id: string): Promise<ProjectDTO | null> => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  create: async (project: ProjectDTO): Promise<ProjectDTO> => {
    try {
      const response = await apiClient.post("/projects", project);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (id: string, project: ProjectDTO): Promise<ProjectDTO | null> => {
    try {
      const response = await apiClient.put(`/projects/${id}`, project);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/projects/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
