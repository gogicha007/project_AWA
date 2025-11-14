import { handleApiError } from "@/utils/handleApiError";
import apiClient from "@/api/api-client";
import { ProjectDTO } from "../projects-list/projectsCRUD/projectSchema";

export const projectApi = {
  getAll: async (): Promise<ProjectDTO[]> => {
    try {
      const response = await apiClient.get("/projects");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getById: async (id: number): Promise<ProjectDTO | null> => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error; // Re-throw so the caller knows it failed
    }
  },

  create: async (project: ProjectDTO, userId: number): Promise<ProjectDTO> => {
    try {
      const projectData = { ...project, userId };
      const response = await apiClient.post("/projects", projectData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (project: ProjectDTO, userId: number): Promise<ProjectDTO | null> => {
    try {
      const { id, ...projectWithoutId } = project;
      const response = await apiClient.patch(`/projects/${id}`, { ...projectWithoutId, userId });
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
