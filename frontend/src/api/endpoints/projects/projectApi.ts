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

  update: async (project: ProjectDTO, userId: number): Promise<ProjectDTO | null> => {
    try {
      const response = await apiClient.patch(`/projects/${project.id}`, { ...project, userId });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/projects/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
